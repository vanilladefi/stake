import WalletConnectProvider from "@walletconnect/web3-provider";
import { useEffect } from "react";
import Web3Modal, { IProviderOptions } from "web3modal";
import { state, useSnapshot } from "../../state";

const WalletModal: React.FC = () => {
  const { signer, provider } = useSnapshot(state)

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
    
    let modal: Web3Modal
    if (typeof window !== 'undefined') {
      modal = new Web3Modal({
        network: "matic",
        cacheProvider: false,
        providerOptions: web3ModalOptions
      });
    }
    state.modal = modal
  }, [])

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
  }, [provider, signer])

  return <></>
}

export default WalletModal
