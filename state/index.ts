import { providers, Signer } from "ethers";
import { proxy, ref, snapshot, subscribe, useSnapshot } from "valtio";
import { subscribeKey } from "valtio/utils";
import Web3Modal from "web3modal";
import { defaultEthereumProvider, defaultPolygonProvider } from "../lib/config";

type BalanceTypes = "eth" | "vnl" | "juice" | "matic";
export type Balances = Partial<Record<BalanceTypes, string>>;

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
  walletAddress: string | null;
  truncatedWalletAddress: string | null;
  modal: Web3Modal | null;
  alert: {
    title: string;
    body?: string | JSX.Element;
    onConfirm?: () => void,
    confirmText?: string
    cancelText?: string
  } | null;
  walletOpen: boolean;
  unstakedBalance: string | null;
};

export const initialState: State = {
  ethereumProvider: ref(defaultEthereumProvider),
  polygonProvider: ref(defaultPolygonProvider),
  providerName: null,
  signer: null,
  balances: {},
  walletAddress: null,
  truncatedWalletAddress: null,
  modal: null,
  alert: null,
  walletOpen: false,
  unstakedBalance: null,
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
