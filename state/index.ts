import { providers, Signer } from 'ethers';
import { proxy, subscribe, useSnapshot } from 'valtio';
import Web3Modal from "web3modal";

type BalanceMapping = {
  [address: string]: string
}

type State = {
  provider?: providers.JsonRpcProvider | providers.Web3Provider | providers.WebSocketProvider | providers.Provider,
  signer?: Signer,
  balances?: BalanceMapping,
  walletAddress?: string,
  modal?: Web3Modal,
}

const state = proxy<State>({})

export { state, useSnapshot, subscribe };

