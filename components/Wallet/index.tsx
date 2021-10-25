import { Box, ThemeUIStyleObject } from "theme-ui";

const Wallet: React.FC<{ sx?: ThemeUIStyleObject }> = ({ sx }) => {
  return (
    <Box sx={{ display: "flex", ...sx }}>
      <Box
        py={2}
        px={3}
        sx={{
          display: "flex",
          flex: 1,
          minWidth: "150px",
          border: "1px solid",
          borderColor: "muted",
          textTransform: "uppercase",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        12.34534 VNL
      </Box>
      <Box
        py={2}
        px={3}
        sx={{
          display: "flex",
          flex: 1,
          minWidth: "150px",
          border: "1px solid",
          borderLeft: "1px",
          borderColor: "muted",
          textTransform: "uppercase",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        1.324 ETH
      </Box>
    </Box>
  );
};

export default Wallet;
