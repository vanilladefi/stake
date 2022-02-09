import { providers } from "ethers";
import { apiKey, ssrApiKey } from "./secrets";

// Specifies whether to use a Websocket provider for ETH RPC or not
export const useWebsocketRpc: boolean =
  process.env.NEXT_PUBLIC_USE_WEBSOCKETS === "true";

// Configurable chain ID, 137 for Polygon/Matic
export const chainId: number =
  (process.env.NEXT_PUBLIC_CHAIN_ID &&
    parseInt(process.env.NEXT_PUBLIC_CHAIN_ID)) ||
  137;
export const hexaDecimalChainId = `0x${Number(chainId).toString(16)}`;

// A Docker env variable for local testing purposes
export const runsOnDocker: boolean = process.env.DOCKER === "true";

// Ethers network
export const network: providers.Networkish = providers.getNetwork(chainId);

// Protocol prefix for RPC URLs
export const protocolPrefix: string = useWebsocketRpc ? "wss://" : "https://";

// If ran with Docker / docker-compose, the local testnet url is not reachable by 'localhost'
export const localHardhatUrl: string = runsOnDocker ? "hardhat" : "localhost";

// RPC URL constructor
export const rpcUrl: string =
  (ssrApiKey && `https://polygon-mainnet.g.alchemy.com/v2/${ssrApiKey}`) ||
  (apiKey && `https://polygon-mainnet.g.alchemy.com/v2/${apiKey}`) ||
  `https://${localHardhatUrl}:8545`;

// The default RPC provider based on config
export const defaultProvider =
  useWebsocketRpc && apiKey && !ssrApiKey
    ? new providers.AlchemyWebSocketProvider(network, apiKey)
    : useWebsocketRpc && !ssrApiKey && !apiKey
    ? new providers.WebSocketProvider(`ws://${localHardhatUrl}:8545`, network)
    : !ssrApiKey && apiKey
    ? new providers.AlchemyProvider(network, apiKey)
    : new providers.JsonRpcProvider(rpcUrl, network);
// TODO: Check if this works in the future (reduces calls to API): new providers.JsonRpcBatchProvider(rpcUrl, network)

// TODO: New values for Polygon/Matic
export const conservativeGasLimit = 800_000;
export const conservativeMigrationGasLimit = 120_000;
export const ethersOverrides = { gasLimit: conservativeGasLimit };
