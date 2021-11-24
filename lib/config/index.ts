import { providers } from 'ethers'
import { IProviderOptions } from 'web3modal'
import { apiKey, ssrApiKey } from './secrets'

export const useWebsocketRpc: boolean =
  process.env.NEXT_PUBLIC_USE_WEBSOCKETS === 'true'

export const chainId: number =
  (process.env.NEXT_PUBLIC_CHAIN_ID &&
    parseInt(process.env.NEXT_PUBLIC_CHAIN_ID)) ||
  137

export const runsOnDocker: boolean = process.env.DOCKER === 'true'

export const network: providers.Networkish = providers.getNetwork(chainId)

export const protocolPrefix: string = useWebsocketRpc ? 'wss://' : 'https://'

export const localHardhatUrl: string = runsOnDocker ? 'hardhat' : 'localhost'

export const rpcUrl: string =
  (ssrApiKey && `https://eth-mainnet.alchemyapi.io/v2/${ssrApiKey}`) ||
  (apiKey && `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`) ||
  `http://${localHardhatUrl}:8545`

export const defaultProvider =
  useWebsocketRpc && apiKey && !ssrApiKey
    ? new providers.AlchemyWebSocketProvider(network, apiKey)
    : useWebsocketRpc && !ssrApiKey && !apiKey
    ? new providers.WebSocketProvider(`ws://${localHardhatUrl}:8545`, network)
    : !ssrApiKey && apiKey
    ? new providers.AlchemyProvider(network, apiKey)
    : new providers.JsonRpcProvider(rpcUrl, network)
// TODO: Check if this works in the future (reduces calls to API): new providers.JsonRpcBatchProvider(rpcUrl, network)

export const defaultProviderOptions: IProviderOptions = {
}

export const blockDeadlineThreshold = 60000 // 600 seconds added to the latest block timestamp (10 minutes)

export const conservativeGasLimit = 800_000
export const conservativeMigrationGasLimit = 120_000
export const ethersOverrides = { gasLimit: conservativeGasLimit }
