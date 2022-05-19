import { epoch, isAddress } from "@vanilladefi/core-sdk";
import { getJuiceStakingContract, LeaderBoard, networks, Options } from '@vanilladefi/stake-sdk';
import { TypedEvent } from '@vanilladefi/stake-sdk/lib/types/juicenet/common';
import { BigNumber, ethers, providers } from "ethers";
import { isHexString } from 'ethers/lib/utils';
import type {
  ILeaderboard,
  JuicerColumn,
  LeaderboardRange,
} from "../components/Leaderboard";
import { state } from "../state";
import { getBlockByTimestamp } from "../utils/helpers";
import { juiceEpoch } from "./config";


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
    console.warn(error);
    return;
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

  const contract = getJuiceStakingContract(options)
  const deltaByToken: Record<string, BigNumber> = {}
  const latestUnstakeByToken: Record<string, number> = {}
  const firstUnstakeByToken: Record<string, number> = {}
  let delta = BigNumber.from(0)

  const stakeFilter: ethers.EventFilter =
    contract.filters.StakeAdded(userAddress)
  const unStakeFilter: ethers.EventFilter =
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

  const unStakes: ethers.Event[] | TypedEvent<any[]>[] = (
    await Promise.all(
      ranges.map((range) =>
        contract.queryFilter(unStakeFilter, range.startBlock, range.endBlock),
      ),
    )
  ).flat()

  // First, filter every realized JUICE profit
  unStakes.forEach((event) => {
    if (event?.args && event?.blockNumber) {
      const { args, blockNumber } = event
      const { unstakedDiff, token } = args

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

  if (Object.keys(deltaByToken).length > 0) {
    const stakes: ethers.Event[] | TypedEvent<any[]>[] = (
      await Promise.all(
        ranges.map((range) =>
          contract.queryFilter(stakeFilter, range.startBlock, range.endBlock),
        ),
      )
    ).flat()

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

  return delta
}


export const getLeaderboard = async (
  from?: string | number,
  to?: string | number,
  limit = 10,
  trimPreviousStake = true,
  options?: Options,
): Promise<LeaderBoard> => {
  const users = await getUsers(from, to, options)
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
