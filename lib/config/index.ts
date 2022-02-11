import { networks } from "@vanilladefi/stake-sdk";
import { providers } from "ethers";
import { apiKey, ssrApiKey } from "./secrets";

// Configurable chain ID, 137 for Polygon/Matic
export const chainId: number =
  (process.env.NEXT_PUBLIC_CHAIN_ID &&
    parseInt(process.env.NEXT_PUBLIC_CHAIN_ID)) ||
  137;
export const getHexaDecimalChainId = (chainId: number) =>
  `0x${chainId.toString(16)}`;

export const getWeb3ModalNetworkName = (networkName: string) => {
  let web3ModalNetworkName = "matic";
  switch (networkName) {
    case "maticmum": {
      web3ModalNetworkName = "mumbai";
    }
    case "local": {
      web3ModalNetworkName = "matic";
    }
    case "matic": {
      web3ModalNetworkName = "matic";
    }
    default: {
      web3ModalNetworkName = "matic";
    }
  }
  return web3ModalNetworkName;
};

export const correctNetwork =
  process.env.NEXT_PUBLIC_NETWORK === "local"
    ? {
        chainId: getHexaDecimalChainId(chainId),
        chainName: "Local Polygon",
        nativeCurrency: {
          name: "MATIC",
          symbol: "MATIC",
          decimals: 18,
        },
        rpcUrls: ["https://localhost:8545"],
        blockExplorerUrls: ["https://polygonscan.com/"],
      }
    : process.env.NEXT_PUBLIC_NETWORK === "maticmum"
    ? {
        chainId: getHexaDecimalChainId(networks.testnet.chainId),
        chainName: "Polygon Mumbai Testnet",
        nativeCurrency: {
          name: "MATIC",
          symbol: "MATIC",
          decimals: 18,
        },
        rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
        blockExplorerUrls: ["https://polygonscan.com/"],
      }
    : {
        chainId: getHexaDecimalChainId(networks.mainnet.chainId),
        chainName: "Polygon Mainnet",
        nativeCurrency: {
          name: "MATIC",
          symbol: "MATIC",
          decimals: 18,
        },
        rpcUrls: ["https://polygon-rpc.com/"],
        blockExplorerUrls: ["https://polygonscan.com/"],
      };

// Ethers network
export const network: providers.Networkish = providers.getNetwork(chainId);

// RPC URL constructor
export const rpcUrl: string =
  (ssrApiKey && `https://polygon-mainnet.g.alchemy.com/v2/${ssrApiKey}`) ||
  (apiKey && `https://polygon-mainnet.g.alchemy.com/v2/${apiKey}`) ||
  `https://localhost:8545`;

// The default RPC provider based on config
export const defaultProvider =
  apiKey && !ssrApiKey
    ? new providers.AlchemyProvider(network, apiKey)
    : new providers.JsonRpcProvider(rpcUrl, network);
