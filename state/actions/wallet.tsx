import { isAddress } from "@vanilladefi/core-sdk";
import {
  getBasicWalletDetails,
  getJuiceStakingContract
} from "@vanilladefi/stake-sdk";
import { BigNumber, providers } from "ethers";
import { snapshot } from "valtio";
import { persistedKeys, ref, state, subscribeKey } from "..";
import { correctNetwork } from "../../lib/config";
import { formatJuice } from "../../utils/helpers";
import { closeDialog, showDialog } from "./dialog";

export const connectWallet = async () => {
  const { modal } = snapshot(state);
  try {
    const provider = await modal?.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const signer = ref(web3Provider.getSigner());

    state.signer = signer;
    state.walletAddress = await signer?.getAddress();

    updateBalances();
    updateUnstakedAmount();
  } catch (error) {
    console.warn(error);
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

// TODO: Instead of prompting user to manually check their network, offer a button that changes/installs the used network to the user's wallet.
export const ensureCorrectChain = async () => {
  try {
    const { signer, walletAddress, modal } = snapshot(state)
    if (window.ethereum?.chainId !== correctNetwork.chainId && signer && walletAddress && modal?.cachedProvider === 'injected') {
      showDialog("Wrong network", {
        body: `Your wallet seems to have the wrong network enabled. Please check that you're using ${correctNetwork.chainName}.`
      });
    }
  } catch (_e) {
    console.error(_e);
  }
};

export const switchToCorrectNetwork = async () => {
  try {
    console.log(correctNetwork)
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [correctNetwork],
    });
    await connectWallet();
    closeDialog();
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

    const { signer, provider } = snapshot(state);

    // subscribe to juice transactions
    try {
      const contractAddress = isAddress(
        process.env.NEXT_PUBLIC_VANILLA_ROUTER_ADDRESS || ""
      );
      const contract = getJuiceStakingContract({
        signerOrProvider: signer || provider || undefined,
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

  subscribeKey(state, "modal", (modal) => {
    if (modal?.cachedProvider) {
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
  const { provider, walletAddress } = snapshot(state);

  if (walletAddress && isAddress(walletAddress)) {
    const contractAddress = isAddress(
      process.env.NEXT_PUBLIC_VANILLA_ROUTER_ADDRESS || ""
    );
    const walletBalances = await getBasicWalletDetails(walletAddress, {
      signerOrProvider: provider || undefined,
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
  const { signer, provider, walletAddress } = snapshot(state);
  if (!walletAddress) {
    state.unstakedBalance = null;
    return;
  }

  try {
    const contractAddress = isAddress(
      process.env.NEXT_PUBLIC_VANILLA_ROUTER_ADDRESS || ""
    );
    const contract = getJuiceStakingContract({
      signerOrProvider: signer || provider || undefined,
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
  const { walletOpen, walletAddress } = snapshot(state);
  if (depositor === walletAddress) {
    await updateUnstakedAmount();
    await updateBalances();
    if (!walletOpen) {
      showDialog("Juice deposited", {
        body: `${formatJuice(amount)} JUICE deposited successfully!`,
      });
    }
  }
}

async function onJuiceWithdrawn(withdrawer: string, amount: BigNumber) {
  const { walletOpen, walletAddress } = snapshot(state);
  if (withdrawer === walletAddress) {
    await updateUnstakedAmount();
    await updateBalances();
    if (!walletOpen) {
      showDialog("Juice withdrawn", {
        body: `${formatJuice(amount)} JUICE withdrawn successfully!`,
      });
    }
  }
}
