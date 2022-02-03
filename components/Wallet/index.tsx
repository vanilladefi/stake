import type * as Stitches from "@stitches/react";
import { state, useSnapshot } from "../../state";
import { connectWallet } from "../../state/actions/wallet";
import Box from "../Box";
import Loader from "../Loader";

const WalletButton: React.FC<{ css?: Stitches.CSS }> = ({ css }) => {
  const { walletAddress, balances, walletOpen } = useSnapshot(state);

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
  };

  return (
    <Box
      css={{ display: "flex", cursor: "pointer", ...css }}
      onClick={() => {
        if (walletAddress) {
          state.walletOpen = !walletOpen;
        }
      }}
    >
      {walletAddress ? (
        <>
          <Box css={buttonStyles}>
            {balances.vnl ? `${balances.vnl} VNL` : <Loader />}
          </Box>
          <Box css={buttonStyles}>
            {balances.matic ? `${balances.matic} MATIC` : <Loader />}
          </Box>
        </>
      ) : (
        <Box css={buttonStyles} onClick={() => connectWallet()}>
          Connect
        </Box>
      )}{" "}
    </Box>
  );
};

export default WalletButton;
