import type * as Stitches from "@stitches/react";
import { state, useSnapshot } from "../../state";
import { connectWallet } from "../../state/actions/wallet";
import Box from "../Box";
import { LoaderWithDelay } from "../Loader";

const WalletButton: React.FC<{ css?: Stitches.CSS }> = ({ css }) => {
  const { walletAddress, truncatedWalletAddress, walletOpen } =
    useSnapshot(state);

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

  const walletButtonStyles = {
    display: "flex",
    flex: 1,
    whiteSpace: "nowrap",
    border: "1px solid",
    borderColor: "$muted",
    color: "$muted",
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: "$sm",
    justifyContent: "center",
    py: "$3",
    px: "$4",
    ...css,
    "&:hover": {
      backgroundColor: "rgba(255,255,255,.1)",
    },
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
          <Box css={walletButtonStyles}>
            {truncatedWalletAddress ? truncatedWalletAddress : <LoaderWithDelay />}
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
