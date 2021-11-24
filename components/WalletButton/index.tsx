import type * as Stitches from "@stitches/react";
import * as sdk from '@vanilladefi/sdk';
import { PrerenderProps } from "@vanilladefi/sdk/lib/types/content";
import { VanillaVersion } from "@vanilladefi/sdk/lib/types/general";
import { useCallback, useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { defaultProviderOptions } from "../../lib/config";
import { state, useSnapshot } from '../../state';
import Box from "../Box";

let modal: Web3Modal
if (typeof window !== 'undefined') {
  modal = new Web3Modal({
    network: "polygon",
    cacheProvider: false,
    providerOptions: defaultProviderOptions
  });
}

const WalletButton: React.FC<{ css?: Stitches.CSS, walletAddress: string }> = ({ css, walletAddress }) => {
  const [data, setData] = useState<PrerenderProps>()
  const { signer, provider } = useSnapshot(state)

  const connect = useCallback(async () => {
    console.log(modal)
    await modal.toggleModal()
    // state.signer = new providers.Web3Provider(await modal.connect()).getSigner()
  }, [])

  const disconnect = useCallback(
    async () => {
      modal?.clearCachedProvider()
      /* if (provider?.disconnect && typeof provider.disconnect === 'function') {
        await provider.disconnect()
      } */
    },
    []
  )

  useEffect(() => {
    const ebin = async () => {
      try {
        const address = await signer?.getAddress()
        state.walletAddress = address
        console.log(address)

      } catch (e) {
        console.error(e)
      }
    }
    ebin()
  }, [signer])
  
  useEffect(
   () =>{
     const getData = async () => {
      setData(await sdk.getBasicWalletDetails(VanillaVersion.V1_1, walletAddress))
     }
     getData()
   }, [walletAddress]
   )

   useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        console.log('accountsChanged', accounts)
      }

      const handleChainChanged = (_hexChainId: string) => {
        window.location.reload()
      }

      const handleDisconnect = (error: { code: number; message: string }) => {
        console.log('disconnect', error)
      }
      
      provider.on('accountsChanged', handleAccountsChanged)
      provider.on('chainChanged', handleChainChanged)
      provider.on('disconnect', handleDisconnect)

      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged)
          provider.removeListener('chainChanged', handleChainChanged)
          provider.removeListener('disconnect', handleDisconnect)
        }
      }
    }
  }, [provider])


  /* useEffect(() => {
    if (modal?.cachedProvider) {
      connect()
    }
  }, [connect, modal?.cachedProvider]) */

  return (
    <Box css={{ display: "flex", cursor: "pointer", ...css }} onClick={connect}>
      <Box
        css={{
          display: "flex",
          flex: 1,
          minWidth: "150px",
          border: "1px solid",
          borderColor: "muted",
          textTransform: "uppercase",
          textAlign: "center",
          justifyContent: "center",
          py: "$4",
          px: "$3",
        }}
      >
        {data?.vnlBalance || '0'} VNL
      </Box>
      <Box
        css={{
          display: "flex",
          flex: 1,
          minWidth: "150px",
          border: "1px solid",
          borderLeft: "1px",
          borderColor: "muted",
          textTransform: "uppercase",
          textAlign: "center",
          justifyContent: "center",
          py: "$4",
          px: "$3",
        }}
      >
        {data?.ethBalance || '0'} ETH
      </Box>
    </Box>
  );
};

export default WalletButton;
