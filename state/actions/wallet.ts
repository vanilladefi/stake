import { isAddress, VanillaVersion } from "@vanilladefi/core-sdk";
import {
  getBasicWalletDetails,
  getJuiceStakingContract,
} from "@vanilladefi/stake-sdk";
import { BigNumber, providers } from "ethers";
import { persistedKeys, ref, state, subscribeKey } from "..";
import { formatJuice } from "../../utils/helpers";
import { showDialog } from "./dialog";

export const connectWallet = async () => {
  try {
    const provider = await state.modal?.connect();
    const web3Provider = new providers.Web3Provider(provider);
    state.signer = ref(web3Provider.getSigner());
    state.walletAddress = await state.signer?.getAddress();

    updateMaticAndVnlBalance();
    updateUnstakedAmount();
  } catch (error) {
    console.warn(error);
  }
};

export const disconnect = () => {
  state.modal?.clearCachedProvider();
  state.signer = null;
  state.walletAddress = null;
  state.walletOpen = false;
  state.truncatedWalletAddress = null;

  localStorage.removeItem(persistedKeys.walletAddress);
  state.balances = {};
  state.unstakedBalance = null;
};

export const initWalletSubscriptions = () => {
  subscribeKey(state, "walletOpen", (walletOpen) => {
    if (walletOpen) {
      updateMaticAndVnlBalance();
      updateUnstakedAmount();
    }
  });

  subscribeKey(state, "walletAddress", (address) => {
    updateMaticAndVnlBalance();
    updateUnstakedAmount();
    updateTruncatedAddress();

    persistWalletAddress();

    // subscribe to juice transactions
    try {
      const contract = maybeGetContract();
      if (address) {
        contract?.on("JUICEWithdrawn", onJuiceWithdrawn);
        contract?.on("JUICEDeposited", onJuiceDeposited);
      } else {
        contract?.off("JUICEWithdrawn", onJuiceWithdrawn);
        contract?.off("JUICEDeposited", onJuiceDeposited);
      }
    } catch (error) {
      console.log(error);
    }
  });

  subscribeKey(state, "modal", (modal) => {
    if (modal?.cachedProvider) {
      connectWallet();
      let name = null;
      switch (state.modal?.cachedProvider) {
        case "injected": {
          name = "Metamask";
          break;
        }
        case "walletconnect": {
          name = "WalletConnect";
          break;
        }
        default: {
          name = null;
        }
      }
      state.providerName = name;
    }
  });
};

export const persistWalletAddress = () => {
  const persistedAddress = localStorage.getItem(persistedKeys.walletAddress);
  if (state.walletAddress !== persistedAddress)
    localStorage.setItem(
      persistedKeys.walletAddress,
      JSON.stringify(state.walletAddress)
    );
};

export const updateMaticAndVnlBalance = async () => {
  if (state.walletAddress && isAddress(state.walletAddress)) {
    const walletBalances = await getBasicWalletDetails(
      VanillaVersion.V2,
      state.walletAddress,
      state.signer?.provider || state.provider || undefined
    );
    if (walletBalances.vnlBalance && walletBalances.ethBalance) {
      state.balances.vnl = Number(walletBalances.vnlBalance).toFixed(3);
      state.balances.eth = Number(walletBalances.ethBalance).toFixed(3);
      state.balances.juice = Number(walletBalances.juiceBalance).toFixed(3);
      state.balances.matic = Number(walletBalances.maticBalance).toFixed(3);
    }
  } else {
    state.balances = {};
  }
};

export const updateUnstakedAmount = async () => {
  if (!state.walletAddress) {
    state.unstakedBalance = null;
    return;
  }
  try {
    const contract = maybeGetContract();
    if (contract) {
      const unstaked = formatJuice(
        await contract.unstakedBalanceOf(state.walletAddress)
      );
      state.unstakedBalance = unstaked;
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateTruncatedAddress = () => {
  const address = state.walletAddress;
  state.truncatedWalletAddress = address
    ? `${address?.substring(0, 6)}…${address?.substring(address.length - 4)}`
    : null;
};

export const maybeGetContract = () => {
  try {
    return getJuiceStakingContract(state.signer || state.provider || undefined);
  } catch (error) {
    console.error(error);
    return null;
  }
};

async function onJuiceDeposited(depositor: string, amount: BigNumber) {
  await updateUnstakedAmount();
  if (!state.walletOpen)
    showDialog("Juice deposited", {
      body: `${formatJuice(amount)} JUICE deposited successfully!`,
    });
}
async function onJuiceWithdrawn(depositor: string, amount: BigNumber) {
  await updateUnstakedAmount();
  if (!state.walletOpen)
    showDialog("Juice withdrawn", {
      body: `${formatJuice(amount)} JUICE withdrawn successfully!`,
    });
}
