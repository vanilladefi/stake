import { styled } from "../../stitches.config";

const Text = styled("span", {
  fontFamily: "$body",
  lineHeight: "$body",
  color: "$text",
  variants: {
    muted: {
      true: {
        color: "$muted",
      },
    },
    size: {
      small: {
        fontSize: "$sm"
      }
    }
  },
});

export default Text;
