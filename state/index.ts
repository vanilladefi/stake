import { getDefaultProvider, providers, Signer } from 'ethers';
import { proxy, ref, snapshot, subscribe, useSnapshot } from 'valtio';
import Web3Modal from "web3modal";

type BalanceMapping = {
  [address: string]: string
}

type State = {
  provider: providers.JsonRpcProvider | providers.Web3Provider | providers.WebSocketProvider | providers.Provider | providers.BaseProvider | null,
  signer: Signer | null,
  balances: BalanceMapping | null,
  walletAddress: string | null,
  modal: Web3Modal | null,
}

const initialState: State = {
  provider: getDefaultProvider(),
  signer: null,
  balances: null,
  walletAddress: null,
  modal: null,
}

const state = proxy<State>(initialState)

export { state, useSnapshot, subscribe, snapshot, ref };

