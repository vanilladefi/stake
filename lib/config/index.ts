import { networks } from "@vanilladefi/stake-sdk";
import { providers } from "ethers";
import { ethereumApiKey, polygonApiKey } from "./secrets";

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
      break;
    }
    case "local": {
      web3ModalNetworkName = "matic";
      break;
    }
    case "matic": {
      web3ModalNetworkName = "matic";
      break;
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
        blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
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

// Ethers networks
export const ethereumNetwork: providers.Networkish =
  providers.getNetwork("homestead");

// RPC URL constructors
export const ethereumRpcUrl: string =
  (ethereumApiKey &&
    `https://eth-mainnet.alchemyapi.io/v2/${ethereumApiKey}`) ||
  `https://localhost:8545`;
export const polygonRpcUrl: string =
  (polygonApiKey &&
    chainId === networks.mainnet.chainId &&
    `https://polygon-mainnet.g.alchemy.com/v2/${polygonApiKey}`) ||
  (polygonApiKey &&
    chainId === networks.testnet.chainId &&
    `https://polygon-mumbai.g.alchemy.com/v2/${polygonApiKey}`) ||
  `https://localhost:8545`;

// The default RPC providers based on config
export const defaultEthereumProvider = ethereumApiKey
  ? new providers.AlchemyProvider(ethereumNetwork, ethereumApiKey)
  : new providers.JsonRpcProvider(ethereumRpcUrl, ethereumNetwork);
export const defaultPolygonProvider = polygonApiKey
  ? new providers.AlchemyProvider(chainId, polygonApiKey)
  : new providers.JsonRpcProvider(polygonRpcUrl, chainId);
