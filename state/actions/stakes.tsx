import { isAddress, Token } from "@vanilladefi/core-sdk";
import { getAllStakes } from "@vanilladefi/stake-sdk";
import { snapshot } from "valtio";
import { Sentiment, Stake, state } from "..";
import tokens from "../../tokens";
import { formatJuice } from "../../utils/helpers";
import { updateBalances } from "./wallet";

export const fetchStakes = async () => {
  const { walletAddress, signer, polygonProvider } = snapshot(state);

  if (!walletAddress || !signer) {
    state.stakes = [];
    return;
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

  const res = await getAllStakes(walletAddress, _tokens, {
    signerOrProvider: signer || (polygonProvider as any),
    optionalAddress: contractAddress || "",
  });

  let _stakes: Stake[] = [];

  _tokens.forEach((token, idx) => {
    const st = res[idx];
    if (!st.juiceStake.isZero()) {
      const stake: Stake = {
        id: token.pairId || token.symbol,
        juiceStake: formatJuice(st.juiceStake),
        juiceValue: formatJuice(st.juiceValue),
        rawJuiceStake: st.juiceStake,
        rawJuiceValue: st.juiceValue,
        sentiment:
          res[idx].sentiment === true ? Sentiment.long : Sentiment.short,
      };
      _stakes.push(stake);
    }
  });

  state.stakes = _stakes;

  updateBalances();
};
