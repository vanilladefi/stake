import type * as Stitches from "@stitches/react";
import { css, keyframes, styled } from "../../stitches.config";
import Box from "../Box";

const gradientAnimation = keyframes({
  "0%": {
    backgroundPosition: "0% 50%"
  },
  "100%": {
    backgroundPosition: "100% 50%"
  }
})

const Loader: React.FC<{ css?: Stitches.CSS }> = styled(Box, {
  display: "flex",
  flex: 1,
  position: "relative",
  height: "100%",
  width: "100%",
  minWidth: "150px",
  minHeight: "1em",
  background: "linear-gradient(90deg, rgba(0,0,0,0.2), rgba(255,255,255,0.2), rgba(0,0,0,0.2))",
  backgroundSize: "400% 400%",
  animation: `${gradientAnimation} 2s linear infinite`,
  ...css,
})

export default Loader
