import WalletConnectProvider from "@walletconnect/web3-provider";
import { useEffect } from "react";
import Web3Modal, { IProviderOptions } from "web3modal";
import { ref, state, useSnapshot } from "../../state";

const WalletModal: React.FC = () => {
  const { signer } = useSnapshot(state)

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

    if (typeof window !== 'undefined') {
      const modal = new Web3Modal({
        network: "matic",
        cacheProvider: true,
        providerOptions: web3ModalOptions
      });
      state.modal = ref(modal)
    }
  }, [])

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
