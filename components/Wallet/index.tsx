import type * as Stitches from "@stitches/react";
import * as sdk from '@vanilladefi/sdk';
import { PrerenderProps } from "@vanilladefi/sdk/lib/types/content";
import { VanillaVersion } from "@vanilladefi/sdk/lib/types/general";
import { useCallback, useEffect, useState } from "react";
import { state, useSnapshot } from '../../state';
import Box from "../Box";


const WalletButton: React.FC<{ css?: Stitches.CSS, walletAddress: string }> = ({ css, walletAddress }) => {
  const [data, setData] = useState<PrerenderProps>()
  const { signer, provider, modal } = useSnapshot(state)

  const disconnect = useCallback(
    async () => {
      modal?.clearCachedProvider()
      /* if (provider?.disconnect && typeof provider.disconnect === 'function') {
        await provider.disconnect()
      } */
    },
    [modal]
  )
  
  useEffect(
   () =>{
     const getData = async () => {
      setData(await sdk.getBasicWalletDetails(VanillaVersion.V1_1, walletAddress))
     }
     getData()
   }, [walletAddress]
   )

  /* useEffect(() => {
    if (modal?.cachedProvider) {
      connect()
    }
  }, [connect, modal?.cachedProvider]) */

  return (
    <Box css={{ display: "flex", cursor: "pointer", ...css }} onClick={() => modal?.connect()}>
      <Box
        css={{
          display: "flex",
          flex: 1,
          minWidth: "150px",
          border: "1px solid",
          borderColor: "muted",
          textTransform: "uppercase",
          textAlign: "center",
          justifyContent: "center",
          py: "$4",
          px: "$3",
        }}
      >
        {data?.vnlBalance || '0'} VNL
      </Box>
      <Box
        css={{
          display: "flex",
          flex: 1,
          minWidth: "150px",
          border: "1px solid",
          borderLeft: "1px",
          borderColor: "muted",
          textTransform: "uppercase",
          textAlign: "center",
          justifyContent: "center",
          py: "$4",
          px: "$3",
        }}
      >
        {data?.ethBalance || '0'} ETH
      </Box>
    </Box>
  );
};

export default WalletButton;
