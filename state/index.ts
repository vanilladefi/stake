import { providers, Signer } from 'ethers'
import { proxy, subscribe, useSnapshot } from 'valtio'

type BalanceMapping = {
  [address: string]: string
}

type State = {
  provider?: providers.JsonRpcProvider | providers.Web3Provider | providers.WebSocketProvider | providers.Provider,
  signer?: Signer,
  balances?: BalanceMapping,
  walletAddress?: string,
}

const state = proxy<State>({})

export { state, useSnapshot, subscribe }
