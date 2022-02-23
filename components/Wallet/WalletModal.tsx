import type * as Stitches from "@stitches/react";
import { networks } from "@vanilladefi/stake-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import Web3Modal, { ICoreOptions, IProviderOptions } from "web3modal";
import { chainId, getWeb3ModalNetworkName, polygonRpcUrl } from "../../lib/config";
import { ref, state } from "../../state";
import { darkTheme, theme } from "../../stitches.config";

const WalletModal: React.FC<{ css?: Stitches.CSS }> = ({ css }) => {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const web3ModalProviderOptions: IProviderOptions | undefined = chainId !== networks.testnet.chainId ? {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          network: getWeb3ModalNetworkName(process.env.NEXT_PUBLIC_NETWORK || ""),
          rpc: {
            [chainId]: polygonRpcUrl, // Wishful thinking that someday walletconnect wallets would support testnets
          }
        },
      },
    } : undefined;

    const themeColors =
      resolvedTheme === "dark"
        ? {
            background: darkTheme.colors.background.value,
            main: darkTheme.colors.text.value,
            secondary: darkTheme.colors.muted.value,
            border: darkTheme.colors.extraMuted.value,
            hover: darkTheme.colors.extraMuted.value,
          }
        : {
            background: theme.colors.background.value,
            main: theme.colors.text.value,
            secondary: theme.colors.muted.value,
            border: theme.colors.extraMuted.value,
            hover: theme.colors.extraMuted.value,
          };

    if (typeof window !== "undefined") {
      let modalOptions: Partial<ICoreOptions> = {
        network: getWeb3ModalNetworkName(process.env.NEXT_PUBLIC_NETWORK || ""),
        cacheProvider: true,
        theme: themeColors,
      }
      if (web3ModalProviderOptions) {
        modalOptions.providerOptions = web3ModalProviderOptions
      }
      const modal = new Web3Modal(modalOptions);
      state.modal = ref(modal);
    }
  }, [resolvedTheme]);

  return <></>;
};

export default WalletModal;
