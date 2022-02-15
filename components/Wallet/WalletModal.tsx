import type * as Stitches from "@stitches/react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import Web3Modal, { IProviderOptions } from "web3modal";
import { polygonRpcUrl } from "../../lib/config";
import { ref, state } from "../../state";
import { darkTheme, theme } from "../../stitches.config";

const WalletModal: React.FC<{ css?: Stitches.CSS }> = ({ css }) => {  
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const web3ModalOptions: IProviderOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          rpc: {
            137: polygonRpcUrl,
            80001: polygonRpcUrl,
          },
        },
      }
    }

    const themeColors = resolvedTheme === 'dark' ? {
      background: darkTheme.colors.background.value,
      main: darkTheme.colors.text.value,
      secondary: darkTheme.colors.muted.value,
      border: darkTheme.colors.extraMuted.value,
      hover: darkTheme.colors.extraMuted.value,
    } : {
      background: theme.colors.background.value,
      main: theme.colors.text.value,
      secondary: theme.colors.muted.value,
      border: theme.colors.extraMuted.value,
      hover: theme.colors.extraMuted.value,
    }

    if (typeof window !== 'undefined') {
      const modal = new Web3Modal({
        network: "matic",
        cacheProvider: true,
        providerOptions: web3ModalOptions,
        theme: themeColors,
      });
      state.modal = ref(modal)
    }
  }, [resolvedTheme])

  return <></>
}

export default WalletModal
