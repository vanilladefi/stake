import type * as Stitches from "@stitches/react";
import * as sdk from '@vanilladefi/sdk';
import { state, useSnapshot } from '../../state';
import { connectWallet, getCachedProvider } from "../../state/actions/wallet";
import Box from "../Box";
import Loader from "../Loader";

const WalletButton: React.FC<{ css?: Stitches.CSS }> = ({ css }) => {
  getCachedProvider()
  
  const { walletAddress, balances, walletOpen } = useSnapshot(state)

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
    <Box css={{ display: "flex", cursor: "pointer", ...css }} onClick={() => {
      if (walletAddress) {
        state.walletOpen = !walletOpen
      }
    }}>{
      walletAddress ? (<>
      <Box
        css={buttonStyles}
      >
        {balances[sdk.vnl.address] ? (`${balances[sdk.vnl.address]} VNL`) : <Loader />}
      </Box>
      <Box
        css={buttonStyles}
      >
        {balances['0'] ? (`${balances['0']} MATIC`) : <Loader />}
      </Box></>
    ) : (<Box css={buttonStyles} onClick={() => connectWallet()}>
      Connect
    </Box>)
} </Box>
  );
};

export default WalletButton;
