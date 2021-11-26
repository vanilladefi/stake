import type * as Stitches from "@stitches/react";
import { isAddress } from "@vanilladefi/sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import Web3Modal, { IProviderOptions } from "web3modal";
import { persistedKeys, ref, state, subscribe, useSnapshot } from "../../state";
import { darkTheme, theme } from "../../stitches.config";

const WalletModal: React.FC<{ css?: Stitches.CSS }> = ({ css }) => {
  const { signer } = useSnapshot(state)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const walletAddress = localStorage.getItem(persistedKeys.walletAddress)
    if (walletAddress && isAddress(walletAddress)) {
      state.walletAddress = walletAddress
    }
    if (state.walletAddress && isAddress(state.walletAddress)) {
      // Persist walletAddress
      subscribe(state.walletAddress, () => {
        state.walletAddress !== walletAddress && localStorage.setItem(persistedKeys.walletAddress, JSON.stringify(state.walletAddress))
      })
    }
  }, [])

  useEffect(() => {
    const web3ModalOptions: IProviderOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          rpc: {
            137: "https://polygon-mainnet.g.alchemy.com/v2/PUOaDJKrBQ9WYQv2kMql7VnaC9tSY2bo",
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

  useEffect(() => {
    const getAddress = async () => {
      const address = await signer?.getAddress()
      state.walletAddress = address || null
    }

    signer && getAddress()
  }, [signer])

  return <></>
}

export default WalletModal
