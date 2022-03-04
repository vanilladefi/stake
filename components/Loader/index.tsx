import { keyframes, styled } from "../../stitches.config";
import Box from "../Box";

const gradientAnimation = keyframes({
  "0%": {
    backgroundPosition: "-400% 50%"
  },
  "50%": {
    backgroundPosition: "0% 50%"
  },
  "100%": {
    backgroundPosition: "400% 50%"
  }
})

const fadeInAnimation = keyframes({
  "0%": {
    opacity: "0"
  },
  "100%": {
    opacity: "1"
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
  opacity: 0,
  background: "linear-gradient(90deg, rgba(241,235,212,0.1), rgba(16,7,15,0.15), rgba(241,235,212,0.1))",
  backgroundSize: "400% 400%",
  animationName: `${gradientAnimation}, ${fadeInAnimation}`,
  animationDuration: "12s, 1s",
  animationTimingFunction: "linear, ease",
  animationIterationCount: "infinite, 1",
  animationDelay: "0, 400ms",
  animationFillMode: "forwards"
})

export default Loader
