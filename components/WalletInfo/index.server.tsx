import type * as Stitches from "@stitches/react";
import * as sdk from '@vanilladefi/sdk';
import { VanillaVersion } from "@vanilladefi/sdk/lib/types/general";
import useData from "../../lib/use-data";
import Box from "../Box";

const WalletInfo: React.FC<{ css?: Stitches.CSS, walletAddress: string }> = ({ css, walletAddress }) => {
  const data = useData(
    'basicWalletDetails', () => sdk.getBasicWalletDetails(VanillaVersion.V1_1, walletAddress))

  return (
    <Box css={{ display: "flex", ...css }}>
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

export default WalletInfo;
