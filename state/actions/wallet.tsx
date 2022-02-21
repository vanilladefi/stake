import { isAddress } from "@vanilladefi/core-sdk";
import {
  getBasicWalletDetails,
  getJuiceStakingContract,
} from "@vanilladefi/stake-sdk";
import { BigNumber, providers } from "ethers";
import { snapshot } from "valtio";
import { toast } from "react-toastify";
import { persistedKeys, ref, state, subscribeKey, VanillaEvents } from "..";
import { correctNetwork } from "../../lib/config";
import { formatJuice } from "../../utils/helpers";
import { showDialog } from "./dialog";

let lockedWalletToast: any;

export const connectWallet = async () => {
  const { modal } = snapshot(state);
  try {
    // Handle metamask locked state
    if (typeof window !== undefined) {
      const isUnlocked = window.ethereum?._metamask?.isUnlocked;
      if (isUnlocked && (await isUnlocked()) === false) {
        const isToastActive = toast.isActive(lockedWalletToast);
        if (isToastActive) return;

        lockedWalletToast = toast.warn(
          "Locked metamask detected, please login in your wallet first!",
          {
            autoClose: 3000,
            closeButton: true,
            position: toast.POSITION.TOP_CENTER,
          }
        );

        return;
      }
    }

    const polygonProvider = await modal?.connect();
    const web3Provider = new providers.Web3Provider(polygonProvider);
    const signer = ref(web3Provider.getSigner());
    const isCorrectChain = ensureCorrectChain(true);
    if (!isCorrectChain) return;

    state.signer = signer;
    state.walletAddress = await signer?.getAddress();

    updateBalances();
    updateUnstakedAmount();
  } catch (error) {
    console.warn("Connection error: ", error);
  }
};

export const disconnect = (soft?: boolean) => {
  const { modal } = snapshot(state);
  !soft && modal?.clearCachedProvider();

  state.signer = null;
  if (!soft) state.walletAddress = null;
  state.walletOpen = false;
  state.truncatedWalletAddress = null;

  !soft && localStorage.removeItem(persistedKeys.walletAddress);
  state.balances = {};
  state.unstakedBalance = null;
};

export const ensureCorrectChain = (force?: true): boolean => {
  const abort = () => {
    disconnect();
    showDialog("Wrong network", {
      body: `Your wallet seems to have the wrong network enabled. You will need to switch to ${correctNetwork.chainName}.`,
      onConfirm: async () => {
        await switchToCorrectNetwork();
        await connectWallet();
      },
      confirmText: "Switch",
      cancelText: "Cancel",
    });
  };
  try {
    const { signer, walletAddress, modal } = snapshot(state);
    if (
      window.ethereum?.chainId !== correctNetwork.chainId &&
      modal?.cachedProvider === "injected"
    ) {
      if ((signer && walletAddress) || force) {
        abort();
      }

      return false;
    }
    return true;
  } catch (_e) {
    console.error(_e);
    return false;
  }
};

export const switchToCorrectNetwork = async () => {
  if (!window.ethereum) return;

  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [correctNetwork],
    });
  } catch (_e) {
    console.error(_e);
  }
};

export const initWalletSubscriptions = () => {
  subscribeKey(state, "walletOpen", (walletOpen) => {
    if (walletOpen) {
      updateBalances();
      updateUnstakedAmount();
    }
  });

  subscribeKey(state, "walletAddress", (address) => {
    updateBalances();
    updateUnstakedAmount();
    updateTruncatedAddress();

    persistWalletAddress();

    const { signer, polygonProvider } = snapshot(state);

    // subscribe to juice transactions
    try {
      const contractAddress = isAddress(
        process.env.NEXT_PUBLIC_VANILLA_ROUTER_ADDRESS || ""
      );
      const contract = getJuiceStakingContract({
        signerOrProvider: signer || polygonProvider || undefined,
        optionalAddress: contractAddress || undefined,
      });
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

  // subscribe to balance changes custom events
  window.addEventListener(VanillaEvents.balancesChanged, () => {
    updateBalances();
    updateUnstakedAmount();
  });

  subscribeKey(state, "modal", (modal) => {
    if (modal?.cachedProvider) {
      // TODO see if we can remove this or make run only once
      connectWallet();
      let name = null;
      switch (modal?.cachedProvider) {
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

export const updateBalances = async () => {
  const { polygonProvider, ethereumProvider, walletAddress } = snapshot(state);

  if (walletAddress && isAddress(walletAddress)) {
    const contractAddress = isAddress(
      process.env.NEXT_PUBLIC_VANILLA_ROUTER_ADDRESS || ""
    );
    const walletBalances = await getBasicWalletDetails(walletAddress, {
      polygonProvider: polygonProvider || undefined,
      ethereumProvider: ethereumProvider || undefined,
      optionalAddress: contractAddress || undefined,
    });

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
  const { signer, polygonProvider, walletAddress } = snapshot(state);
  if (!walletAddress) {
    state.unstakedBalance = null;
    return;
  }

  try {
    const contractAddress = isAddress(
      process.env.NEXT_PUBLIC_VANILLA_ROUTER_ADDRESS || ""
    );
    const contract = getJuiceStakingContract({
      signerOrProvider: signer || polygonProvider || undefined,
      optionalAddress: contractAddress || undefined,
    });
    if (contract) {
      const unstaked = formatJuice(
        await contract.unstakedBalanceOf(walletAddress)
      );
      state.unstakedBalance = unstaked;
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateTruncatedAddress = () => {
  const { walletAddress } = snapshot(state);
  ensureCorrectChain();
  state.truncatedWalletAddress = walletAddress
    ? `${walletAddress?.substring(0, 6)}…${walletAddress?.substring(
        walletAddress.length - 4
      )}`
    : null;
};

async function onJuiceDeposited(depositor: string, amount: BigNumber) {
  const { walletAddress } = snapshot(state);
  if (depositor.toLocaleLowerCase() === walletAddress?.toLocaleLowerCase()) {
    await updateUnstakedAmount();
    await updateBalances();

    // TODO discuss if we need this as we already have transaction confirmation toast
    toast.success(`${formatJuice(amount)} JUICE deposited successfully!`, {
      autoClose: 2000,
      hideProgressBar: true,
    });
  }
}

async function onJuiceWithdrawn(withdrawer: string, amount: BigNumber) {
  const { walletAddress } = snapshot(state);
  if (withdrawer.toLocaleLowerCase() === walletAddress?.toLocaleLowerCase()) {
    await updateUnstakedAmount();
    await updateBalances();

    toast.success(`${formatJuice(amount)} JUICE withdrawn successfully!`, {
      autoClose: 2000,
      hideProgressBar: true,
    });
  }
}
