import type * as Stitches from "@stitches/react";
import * as sdk from '@vanilladefi/sdk';
import { isAddress } from "@vanilladefi/sdk";
import { PrerenderProps } from "@vanilladefi/sdk/lib/types/content";
import { VanillaVersion } from "@vanilladefi/sdk/lib/types/general";
import { providers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { persistedKeys, ref, state, useSnapshot } from '../../state';
import Box from "../Box";
import Loader from "../Loader";

const WalletButton: React.FC<{ css?: Stitches.CSS }> = ({ css }) => {
  const [data, setData] = useState<PrerenderProps>()
  const { modal, walletAddress } = useSnapshot(state)

  const disconnect = useCallback(
    async () => {
      modal?.clearCachedProvider()
      state.signer = null
      state.walletAddress = null
      localStorage.removeItem(persistedKeys.walletAddress)
      setData(undefined)
    },
    [modal]
  )
  
  const connect = useCallback(async () => {
    const provider = await modal?.connect()
    const web3Provider = new providers.Web3Provider(provider)
    state.signer = ref(web3Provider.getSigner())
  }, [modal])

  useEffect(
    () => {
      const getData = async () => {
        if (walletAddress && isAddress(walletAddress)) {
          const walletBalances = await sdk.getBasicWalletDetails(VanillaVersion.V1_1, walletAddress)
          walletBalances.vnlBalance = Number(walletBalances.vnlBalance).toFixed(3)
          walletBalances.ethBalance = Number(walletBalances.ethBalance).toFixed(3)
          setData(walletBalances)
        }
      }
      getData()
    },
    [walletAddress]
  )

  useEffect(() => {
    if (modal?.cachedProvider) {
      connect()
    }
  }, [connect, modal?.cachedProvider])

  const buttonStyles = {
    display: "flex",
    flex: 1,
    whiteSpace: "nowrap",
    border: "1px solid",
    borderColor: "muted",
    textTransform: "uppercase",
    textAlign: "center",
    justifyContent: "center",
    py: "$4",
    px: "$3",
    ...css,
  }

  return (
    <Box css={{ display: "flex", cursor: "pointer", ...css }} onClick={() => disconnect()}>{
      walletAddress ? (<>
      <Box
        css={buttonStyles}
      >
        {data ? (`${data?.vnlBalance} VNL`) : <Loader />}
      </Box>
      <Box
        css={buttonStyles}
      >
        {data ? (`${data?.ethBalance} MATIC`) : <Loader />}
      </Box></>
    ) : (<Box css={buttonStyles} onClick={() => connect()}>
      Connect
    </Box>)
} </Box>
  );
};

export default WalletButton;
