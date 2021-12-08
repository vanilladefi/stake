import { getBasicWalletDetails, isAddress, vnl } from "@vanilladefi/sdk"
import { VanillaVersion } from "@vanilladefi/sdk/lib/types/general"
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
    getMaticAndVnlBalance()
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

export const getCachedProvider = () => {
  if (state.modal?.cachedProvider) {
    connectWallet()
  }
}
