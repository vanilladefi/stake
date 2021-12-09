import { keyframes, styled } from "../../stitches.config";
import Box from "../Box";

const gradientAnimation = keyframes({
  "0%": {
    backgroundPosition: "0% 50%"
  },
  "100%": {
    backgroundPosition: "100% 50%"
  }
})

const Loader = styled(Box, {
  position: "relative",
  display: "flex",
  flex: 1,
  height: "100%",
  width: "100%",
  minWidth: "150px",
  minHeight: "1em",
  background: "linear-gradient(90deg, rgba(241,235,212,0.2), rgba(16,7,15,0.2), rgba(241,235,212,0.2))",
  backgroundSize: "400% 400%",
  animation: `${gradientAnimation} 2s linear infinite`
})

export default Loader
