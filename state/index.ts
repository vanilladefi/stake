import { BigNumber, providers, Signer } from "ethers";
import { proxy, ref, snapshot, subscribe, useSnapshot } from "valtio";
import { subscribeKey } from "valtio/utils";
import Web3Modal from "web3modal";
import { defaultEthereumProvider, defaultPolygonProvider } from "../lib/config";

type PrimitiveBalanceTypes = "eth" | "vnl" | "juice" | "matic"
type JuicenetBalanceTypes = "unstakedJuice" | "stakedJuice" | "totalJuice";

export type Balances = {
  [key in PrimitiveBalanceTypes | JuicenetBalanceTypes]?: string;
};

export type RawBalances = {
  [key in PrimitiveBalanceTypes | JuicenetBalanceTypes]?: BigNumber
}

export enum Sentiment {
  long = "long",
  short = "short",
}

export type Stake = {
  id: string;
  juiceStake: string;
  juiceValue: string;
  rawJuiceStake: BigNumber;
  rawJuiceValue: BigNumber;
  sentiment: Sentiment;
};


type State = {
  ethereumProvider:
  | providers.JsonRpcProvider
  | providers.Web3Provider
  | providers.WebSocketProvider
  | providers.Provider
  | providers.BaseProvider
  | null;
  polygonProvider:
  | providers.JsonRpcProvider
  | providers.Web3Provider
  | providers.WebSocketProvider
  | providers.Provider
  | providers.BaseProvider
  | null;
  providerName: string | null;
  signer: Signer | null;
  balances: Balances;
  rawBalances: RawBalances;
  walletAddress: string | null;
  truncatedWalletAddress: string | null;
  modal: Web3Modal | null;
  stakes: Stake[] | null;
  alert: {
    title: string;
    body?: string | JSX.Element;
    onConfirm?: () => void,
    onCancel?: () => void,
    confirmText?: string
    cancelText?: string
  } | null;
  walletOpen: boolean;
};

export const initialState: State = {
  ethereumProvider: ref(defaultEthereumProvider),
  polygonProvider: ref(defaultPolygonProvider),
  providerName: null,
  signer: null,
  balances: {},
  rawBalances: {},
  walletAddress: null,
  truncatedWalletAddress: null,
  modal: null,
  alert: null,
  stakes: null,
  walletOpen: false,
};

const persistedKeys = {
  walletAddress: "vanilla-walletAddress",
};

enum VanillaEvents {
  stakesChanged = 'vanilla-StakesChanged',
  balancesChanged = 'vanilla-BalancesChanged',
}

const state = proxy<State>(initialState);

export {
  state,
  useSnapshot,
  subscribe,
  subscribeKey,
  snapshot,
  ref,
  persistedKeys,
  VanillaEvents
};
