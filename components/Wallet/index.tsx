import Box from "../Box";
import type * as Stitches from "@stitches/react";

const Wallet: React.FC<{ css?: Stitches.CSS }> = ({ css }) => {
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
        12.34534 VNL
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
        1.324 ETH
      </Box>
    </Box>
  );
};

export default Wallet;