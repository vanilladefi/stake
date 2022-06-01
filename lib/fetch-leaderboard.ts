import { epoch, isAddress, Token } from "@vanilladefi/core-sdk";
import { getAllStakes, getJuiceStakingContract, LeaderBoard, networks, Options, } from '@vanilladefi/stake-sdk';
import { TypedEvent } from '@vanilladefi/stake-sdk/lib/types/juicenet/common';
import { BigNumber, ethers, providers } from "ethers";
import { isHexString } from 'ethers/lib/utils';
import type {
  ILeaderboard,
  JuicerColumn,
  LeaderboardRange,
} from "../components/Leaderboard";
import { state } from "../state";
import tokens from '../tokens';
import client from '../urql';
import { getBlockByTimestamp } from "../utils/helpers";
import { juiceEpoch } from "./config";
import { snapshot } from "valtio"

export const getLeaderboardData = async (
  range: LeaderboardRange
): Promise<JuicerColumn[] | undefined> => {
  try {
    const optionalAddress = isAddress(
      process.env.NEXT_PUBLIC_VANILLA_ROUTER_ADDRESS || ""
    );

    const provider = state.polygonProvider; // ?
    if (!provider) throw Error("Cannot access provider");

    const before7D = await getBlockByTimestamp(
      Date.now() - 7 * 24 * 60 * 60,
      provider
    );

    const before1D = await getBlockByTimestamp(
      Date.now() - 24 * 60 * 60,
      provider
    );

    const from =
      range === "weekly" ? before7D : range === "daily" ? before1D : juiceEpoch;

    const leaderboard = await getLeaderboard(from, "latest", 10, false, {
      signerOrProvider: provider,
      optionalAddress: optionalAddress || undefined,
      blockThreshold: Infinity,
    });

    const data = await Promise.all(
      leaderboard.map(async (val) => {
        let user: string;
        let delta: BigNumber;
        if (val instanceof Array) {
          [user, delta] = val;
        } else {
          ({ user, delta } = val);
        }

        let juicer: string;
        try {
          juicer =
            (await state.ethereumProvider?.lookupAddress?.(user)) || user;
        } catch (error) {
          juicer = user;
        }

        return {
          juicer,
          juiceAmount: delta.toString(),
        };
      })
    );

    return data;
  } catch (error) {
    throw error
  }
};

export const fetchLeaderboard = async (): Promise<ILeaderboard> => {
  return {
    allTimeData: await getLeaderboardData("all-time"),
    weeklyData: await getLeaderboardData("weekly"),
    dailyData: await getLeaderboardData("daily"),
  };
};



/**
 * Fetches an individual user's JUICE delta in given block interval.
 *
 * @param userAddress
 * @param from
 * @param to
 * @param options
 * @returns User's JUICE delta as a BigNumber.
 */
export const getUserJuiceDelta = async (
  userAddress: string,
  from?: string | number,
  to?: string | number,
  trimPreviousStake = true,
  options?: Options,
): Promise<BigNumber> => {
  const parsedFrom = await parseBlockTagToBlockNumber(from || epoch, options)
  const parsedTo = await parseBlockTagToBlockNumber(to || 'latest', options)
  const blockThreshold = options?.blockThreshold || 1000
  const isAllTime = parsedFrom <= juiceEpoch

  const contract = getJuiceStakingContract(options)

  const stakeFilter: ethers.EventFilter =
    contract.filters.StakeAdded(userAddress)
  const unstakeFilter: ethers.EventFilter =
    contract.filters.StakeRemoved(userAddress)

  // Split requests to ranges because of RPCs having block depth limits
  const ranges: Array<{ startBlock: number; endBlock: number }> = []
  let startBlock = parsedFrom
  let endBlock =
    parsedTo > startBlock + blockThreshold
      ? startBlock + blockThreshold
      : parsedTo
  let oldEndBlock = endBlock
  while (endBlock < parsedTo - blockThreshold) {
    ranges.push({ startBlock, endBlock })
    oldEndBlock = endBlock
    endBlock =
      endBlock + blockThreshold > parsedTo
        ? parsedTo
        : endBlock + blockThreshold
    startBlock = oldEndBlock + 1
  }
  ranges.push({ startBlock, endBlock })

  const unstakes: ethers.Event[] | TypedEvent<any[]>[] = (
    await Promise.all(
      ranges.map((range) =>
        contract.queryFilter(unstakeFilter, range.startBlock, range.endBlock),
      ),
    )
  ).flat()

  const stakes: ethers.Event[] | TypedEvent<any[]>[] = (
    await Promise.all(
      ranges.map((range) =>
        contract.queryFilter(stakeFilter, range.startBlock, range.endBlock),
      ),
    )
  ).flat()

  const unstakesByToken: Record<string, [ethers.Event] | undefined> = {}
  const stakesByToken: Record<string, [ethers.Event] | undefined> = {}

  const latestUnstakeByToken: Record<string, number> = {}
  const firstUnstakeByToken: Record<string, number> = {}
  const deltaByToken: Record<string, BigNumber> = {}

  unstakes.forEach(event => {
    const { args, blockNumber } = event
    if (!args) return

    const { token, unstakedDiff } = args
    if (!isAllTime) {
      if (unstakesByToken[token]) {
        unstakesByToken[token]?.push(event)
      }
      else {
        unstakesByToken[token] = [event]
      }
    }
    else {
      if (deltaByToken[token]) {
        deltaByToken[token] = deltaByToken[token].add(unstakedDiff)
      } else {
        deltaByToken[token] = unstakedDiff
      }

      if (
        !firstUnstakeByToken[token] ||
        firstUnstakeByToken[token] > blockNumber
      ) {
        firstUnstakeByToken[token] = blockNumber
      }

      if (
        !latestUnstakeByToken[token] ||
        latestUnstakeByToken[token] < blockNumber
      ) {
        latestUnstakeByToken[token] = blockNumber
      }
    }
  })

  stakes.forEach(event => {
    const { args } = event
    if (!args) return

    const { token } = args
    if (stakesByToken[token]) {
      stakesByToken[token]?.push(event)
    }
    else {
      stakesByToken[token] = [event]
    }
  })

  let delta = BigNumber.from(0)

  if (!isAllTime) {
    // For each unstake for a token look for the previuos stake's block or inital block
    // then compare prices at those and calculate delta
    await Promise.all(Object.values(unstakesByToken).map(async events => {
      if (!events) return

      await Promise.all(events.map(async event => {
        const { args, blockNumber } = event
        if (!args) return

        const { unstakedDiff, token } = args

        const _token = tokens.find(t => t.address?.toLocaleLowerCase() === token.toLocaleLowerCase())
        const tokenId = _token?.alias || _token?.id || ''

        const prevStake: ethers.Event | undefined = findPrevStake(blockNumber, stakesByToken[token])
        const initBlockNumber = prevStake?.blockNumber || parsedFrom

        const initPrice = await getTokenPrice(tokenId, initBlockNumber)
        const finalPrice = await getTokenPrice(tokenId, blockNumber)

        if (!initPrice || !finalPrice) return
        // juice_diff =  price_diff * n
        // = price_diff * (final_juice / final_price)

        const priceDiff = finalPrice.sub(initPrice)
        const val = unstakedDiff.mul(priceDiff.abs()).div(finalPrice)

        delta = delta.add(val)
      }))
    }))
  }
  else {
    if (Object.keys(deltaByToken).length > 0) {
      // Remove stakes from delta
      stakes.forEach((event) => {
        if (event?.args && event?.blockNumber) {
          const { args, blockNumber } = event
          const { unstakedDiff, token } = args
          if (
            Object.keys(deltaByToken).includes(token) &&
            latestUnstakeByToken[token] > blockNumber
          ) {
            // Remove the stakes previous to first unstake from the delta if trimPreviousStake === true
            if (
              !(trimPreviousStake && firstUnstakeByToken[token] < blockNumber)
            ) {
              deltaByToken[token] = deltaByToken[token].add(unstakedDiff)
            }
          }
        }
      })

      delta = Object.values(deltaByToken).reduce((_previous, _current) =>
        _previous.add(_current),
      )
    }
  }


  const _tokens: Token[] = tokens
    .filter((t) => t.enabled && t.address)
    .map((t) => ({
      address: t.address as string,
      pairId: t.id,
      symbol: t.id,
      decimals: t.decimals + "",
      chainId: "",
      logoColor: "",
    }));

  const contractAddress = isAddress(
    process.env.NEXT_PUBLIC_VANILLA_ROUTER_ADDRESS || ""
  );


  const { polygonProvider } = snapshot(state);
  const res = await getAllStakes(userAddress, _tokens, {
    signerOrProvider: polygonProvider || undefined,
    optionalAddress: contractAddress || undefined,
  });
  await Promise.all(_tokens.map(async (token, idx) => {
    const st = res[idx];
    if (st.juiceStake.isZero()) return

    const prevStake: ethers.Event | undefined = findPrevStake(parsedTo, stakesByToken[token.address])
    const initBlockNumber = prevStake?.blockNumber || parsedFrom

    const initPrice = await getTokenPrice(token.symbol, initBlockNumber)
    const finalPrice = await getTokenPrice(token.symbol, parsedTo - 40)
    if (!initPrice || !finalPrice) return

    const priceDiff = finalPrice.sub(initPrice)

    // juice_diff = price_diff * n
    // = price_diff * (init_juice / init_price)

    const multiplier = st.sentiment === true ? 1 : -1
    const val = st.juiceStake.mul(priceDiff).mul(multiplier).div(initPrice)

    delta = delta.add(val)
  }));

  return delta
}

function findPrevStake(blockNumber: number, stakes?: ethers.Event[]) {
  if (!stakes || !stakes.length) return

  for (let i = stakes.length - 1; i >= 0; i--) {
    const stake = stakes[i]
    if (stake.blockNumber < blockNumber) return stake
  }
}

const PRICE_QUERY = `
  query MyQuery($id: String, $block: Int = 12134736) {
    assetPair(id: $id, block: {number: $block}) {
      currentPrice
      blockNumber
      id
    }
  }
`;
async function getTokenPrice(token: string, blockNumber: number): Promise<BigNumber | undefined> {
  let id = token.endsWith("USD") ? token : `${token}/USD`

  if (id.startsWith("WETH")) id = 'ETH/USD'
  else if (id.startsWith("WBTC")) id = 'BTC/USD'
  else if (id.startsWith("WMATIC")) id = "MATIC/USD"

  const result = await client
    .query(PRICE_QUERY, { id, block: blockNumber })
    .toPromise()
  const price = result.data?.assetPair?.currentPrice
  if (!price) return
  return BigNumber.from(price)
}

export const getLeaderboard = async (
  from?: string | number,
  to?: string | number,
  limit = 10,
  trimPreviousStake = true,
  options?: Options,
): Promise<LeaderBoard> => {
  const users = await getUsers(juiceEpoch, 'latest', options)
  let juiceDeltas: LeaderBoard = await Promise.all(
    Array.from(users).map(async (user) => ({
      user: user,
      delta: await getUserJuiceDelta(
        user,
        from,
        to,
        trimPreviousStake,
        options,
      ),
    })),
  )
  juiceDeltas = juiceDeltas.sort((a, b) => {
    if (a.delta.gt(b.delta)) {
      return -1
    } else if (a.delta.eq(b.delta)) {
      return 0
    } else {
      return 1
    }
  })
  return juiceDeltas.slice(0, limit)
}

export const getUsers = async (
  from: string | number = epoch,
  to?: string | number,
  options?: Options,
): Promise<Set<string>> => {
  const contract = getJuiceStakingContract(options)
  const users: Set<string> = new Set()

  const stakeFilter: ethers.EventFilter = contract.filters.StakeAdded()
  const stakes: ethers.Event[] | TypedEvent<any[]>[] =
    await contract.queryFilter(stakeFilter, from, to)

  stakes.forEach((event) => {
    users.add(event?.args?.user)
  })

  return users
}



export const parseBlockTagToBlockNumber = async (
  blockTag: string | number,
  options?: Options,
): Promise<number> => {
  let blockNumber = 0
  let latestBlockNumber = 0
  const polygonProvider =
    options?.polygonProvider || providers.getDefaultProvider(networks.mainnet)

  if (blockTag === 'latest' || blockTag < 0) {
    latestBlockNumber = await polygonProvider.getBlockNumber()
  }

  if (isHexString(blockTag)) {
    blockNumber = parseInt(String(blockTag), 16)
  } else if (blockTag === 'latest') {
    blockNumber = latestBlockNumber
  } else if (typeof blockTag === 'number') {
    if (blockTag < 0) {
      blockNumber = blockTag + latestBlockNumber
    } else {
      blockNumber = blockTag
    }
  }

  return blockNumber
}
