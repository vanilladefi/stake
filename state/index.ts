import { getDefaultProvider, providers, Signer } from 'ethers';
import { proxy, ref, snapshot, subscribe, useSnapshot } from 'valtio';
import { subscribeKey } from 'valtio/utils';
import Web3Modal from "web3modal";

type State = {
  provider: providers.JsonRpcProvider | providers.Web3Provider | providers.WebSocketProvider | providers.Provider | providers.BaseProvider | null,
  signer: Signer | null,
  balances: {[key:string]: string},
  walletAddress: string | null,
  modal: Web3Modal | null,
  walletOpen: boolean,
  staked: string | null,
}

export const initialState: State = {
  provider: getDefaultProvider(),
  signer: null,
  balances: {},
  walletAddress: null,
  modal: null,
  walletOpen: false,
  staked: '3000.00',
}

const persistedKeys = {
  walletAddress: 'vanilla-walletAddress'
}

const state = proxy<State>(initialState)

export { state, useSnapshot, subscribe, subscribeKey, snapshot, ref, persistedKeys };

