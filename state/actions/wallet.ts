import { isAddress } from "@vanilladefi/core-sdk";
import {
  getBasicWalletDetails,
  getJuiceStakingContract,
} from "@vanilladefi/stake-sdk";
import { BigNumber, providers } from "ethers";
import { snapshot } from "valtio";
import { persistedKeys, ref, state, subscribeKey } from "..";
import { formatJuice } from "../../utils/helpers";
import { showDialog } from "./dialog";

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

export const disconnect = () => {
  const { modal } = snapshot(state);
  modal?.clearCachedProvider();

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
      const contract = getJuiceStakingContract({
        signerOrProvider: signer || provider || undefined,
        optionalAddress:
          isAddress(process.env.NEXT_PUBLIC_VANILLA_ROUTER_ADDRESS || "") ||
          undefined,
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
  const { signer, provider, walletAddress } = snapshot(state);

  if (walletAddress && isAddress(walletAddress)) {
    const walletBalances = await getBasicWalletDetails(walletAddress, {
      provider: signer?.provider || provider || undefined,
      optionalAddress:
        process.env.NEXT_PUBLIC_VANILLA_ROUTER_ADDRESS || undefined,
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
    const contract = getJuiceStakingContract({
      signerOrProvider: signer || provider || undefined,
      optionalAddress:
        isAddress(process.env.NEXT_PUBLIC_VANILLA_ROUTER_ADDRESS || "") ||
        undefined,
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
  state.truncatedWalletAddress = walletAddress
    ? `${walletAddress?.substring(0, 6)}…${walletAddress?.substring(
        walletAddress.length - 4
      )}`
    : null;
};

async function onJuiceDeposited(depositor: string, amount: BigNumber) {
  await updateUnstakedAmount();
  const { walletOpen } = snapshot(state);
  if (!walletOpen) {
    showDialog("Juice deposited", {
      body: `${formatJuice(amount)} JUICE deposited successfully!`,
    });
  }
}

async function onJuiceWithdrawn(depositor: string, amount: BigNumber) {
  await updateUnstakedAmount();
  const { walletOpen } = snapshot(state);
  if (!walletOpen) {
    showDialog("Juice withdrawn", {
      body: `${formatJuice(amount)} JUICE withdrawn successfully!`,
    });
  }
}
