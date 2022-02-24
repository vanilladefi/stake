import { styled } from "../../stitches.config";
import Box from "../Box";

const Container = styled(Box, {
  width: "100%",
  maxWidth: "$space$layoutPlus",
  marginLeft: "auto",
  marginRight: "auto",
  px: "$3",
  "@initial": {
    maxWidth: "100%",
  },
  "@md": {
    maxWidth: "$space$layout",
    px: "$10",
  },
  "@lg": {
    maxWidth: "$space$layoutPlus",
    px: "$14",
  },
});

export default Container;
