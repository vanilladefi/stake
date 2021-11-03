import { styled } from "../../stitches.config";
import Box from "../Box";

const Container = styled(Box, {
  // display: "flex",
  // flex: 1,
  width: "100%",
  maxWidth: "$space$layoutPlus",
  marginLeft: "auto",
  marginRight: "auto",
  px: "$4",
  "@initial": {
    maxWidth: "100%",
  },
  "@md": {
    maxWidth: "$space$layout",
  },
  "@lg": {
    maxWidth: "$space$layoutPlus",
  },
});

export default Container;
