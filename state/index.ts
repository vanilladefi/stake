import { providers, Signer } from 'ethers';
import { proxy, ref, snapshot, subscribe, useSnapshot } from 'valtio';
import { subscribeKey } from 'valtio/utils';
import Web3Modal from "web3modal";
import { defaultProvider } from '../lib/config';

type State = {
  provider: providers.JsonRpcProvider | providers.Web3Provider | providers.WebSocketProvider | providers.Provider | providers.BaseProvider | null,
  providerName: string | null,
  signer: Signer | null,
  balances: {[key:string]: string},
  walletAddress: string | null,
  truncatedWalletAddress: string | null,
  modal: Web3Modal | null,
  walletOpen: boolean,
  staked: string | null,
}

export const initialState: State = {
  provider: defaultProvider,
  providerName: null,
  signer: null,
  balances: {},
  walletAddress: null,
  truncatedWalletAddress: null,
  modal: null,
  walletOpen: false,
  staked: '3000.00',
}

const persistedKeys = {
  walletAddress: 'vanilla-walletAddress'
}

const state = proxy<State>(initialState)

export { state, useSnapshot, subscribe, subscribeKey, snapshot, ref, persistedKeys };

