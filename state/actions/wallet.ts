import { getBasicWalletDetails, isAddress, vnl } from "@vanilladefi/trade-sdk"
import { VanillaVersion } from "@vanilladefi/core-sdk"
import { getJuiceStakingContract } from "@vanilladefi/stake-sdk"
import { providers } from "ethers"
import { persistedKeys, ref, state, subscribeKey } from ".."
import { toJuice } from '../../utils/helpers'

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

export const updateUnstakedAmount = async () => {
  if (!state.walletAddress) {
    return
  }
  try {
    const contract = getJuiceStakingContract(state.signer || state.provider || undefined)
    const unstaked = (await contract.unstakedBalanceOf(state.walletAddress)).div(10 ** 8).toString()
    console.log({ unstaked })
    state.unstakedBalance = unstaked
  } catch (error) {
    console.error(error)
  }
}

export const connectWallet = async () => {
  const provider = await state.modal?.connect()
  const web3Provider = new providers.Web3Provider(provider)
  state.signer = ref(web3Provider.getSigner())
  state.walletAddress = await state.signer?.getAddress()

  // updateStakedAmount()
}

// Temporary for now, this whole file needs to be refactored
let called = false
function fn() {
  if (called) return
  called = true
  subscribeKey(state, 'walletOpen', walletOpen => {
    if (walletOpen) {
      updateUnstakedAmount()
    }
  })
  subscribeKey(state, 'walletAddress', walletAddress => {
    if (walletAddress) {
      try {
        // TODO unsubscribe on account change
        const contract = getJuiceStakingContract(state.signer || state.provider || undefined)
        contract.on('JUICEDeposited', (depositor, amount) => {
          updateUnstakedAmount()
          // TODO Replace with modal
          alert(`${toJuice(amount)} JUICE deposited successfully!`)
        })
        contract.on('JUICEWithdrawn', (depositor, amount) => {
          updateUnstakedAmount()
          alert(`${toJuice(amount)} JUICE withdrawn successfully!`)
        })
      } catch (error) { }
    }
  })
}
fn()

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
