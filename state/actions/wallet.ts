import { getBasicWalletDetails, isAddress, vnl } from "@vanilladefi/trade-sdk"
import { VanillaVersion } from "@vanilladefi/core-sdk"
import { providers } from "ethers"
import { persistedKeys, ref, state, subscribeKey } from ".."

export const persistWalletAddress = () => {
  const walletAddress = localStorage.getItem(persistedKeys.walletAddress)
  if (walletAddress && isAddress(walletAddress)) {
    state.walletAddress = walletAddress
  }
  // Persist walletAddress
  subscribeKey(state, 'walletAddress', (address) => {
    address !== walletAddress && localStorage.setItem(persistedKeys.walletAddress, JSON.stringify(address))
    if (address && isAddress(address)) {
      getMaticAndVnlBalance()
      state.truncatedWalletAddress = `${state.walletAddress?.substring(0, 6)}…${state.walletAddress?.substring(state.walletAddress.length - 4)}`
    }
  })
}

export const getMaticAndVnlBalance = async () => {
  if (state.walletAddress && isAddress(state.walletAddress)) {
    const walletBalances = await getBasicWalletDetails(VanillaVersion.V1_1, state.walletAddress)
    if (walletBalances.vnlBalance && walletBalances.ethBalance) {
      state.balances[vnl.address] = Number(walletBalances.vnlBalance).toFixed(3)
      state.balances["0"] = Number(walletBalances.ethBalance).toFixed(3)
    }
  }
}

export const connectWallet = async () => {
  const provider = await state.modal?.connect()
  const web3Provider = new providers.Web3Provider(provider)
  state.signer = ref(web3Provider.getSigner())
  state.walletAddress = await state.signer?.getAddress()
}

export const disconnect = () => {
  state.modal?.clearCachedProvider()
  state.signer = null
  state.walletAddress = null
  state.balances = {}
  state.walletOpen = false
  localStorage.removeItem(persistedKeys.walletAddress)
}

export const connectToCachedProvider = () => {
  subscribeKey(state, 'modal', (modal) => {
    if (modal?.cachedProvider) {
      connectWallet()
      let name = null
      switch (state.modal?.cachedProvider) {
        case 'injected': {
          name = 'Metamask'
          break
        }
        case 'walletconnect': {
          name = 'WalletConnect'
          break
        }
        default: {
          name = null
        }
      }
      state.providerName = name
    }
  })
}
