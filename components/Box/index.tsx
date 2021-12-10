import { styled } from "../../stitches.config";

const Box = styled("div", {
  // all: "unset",
  boxSizing: "border-box",
  variants: {
    fluid: {
      true: {
        width: '100%'
      }
    }
  }
});

export default Box;
