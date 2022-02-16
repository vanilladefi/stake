import { state } from "../../state";
import Box from "../Box";

const Curtain: React.FC = () => {
  return (
    <Box
      css={{
        background: "$modalCurtainBg",
        backdropFilter: "blur(24px)",
        display: "flex",
        position: "fixed",
        width: "100vw",
        height: "100vh",
        top: "0",
        left: "0",
        zIndex: "42",
      }}
      onClick={() => (state.walletOpen = false)}
    ></Box>
  );
};

export default Curtain;
