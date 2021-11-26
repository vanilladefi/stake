import Box from "../Box";
import { styled } from "../../stitches.config";
import type * as Stitches from "@stitches/react";

const StackComponent = styled(Box, {
  display: "flex",
  gap: "$4",
});

const Stack: React.FC<{
  css?: Stitches.CSS;
}> = ({ css, children }) => {
  return <StackComponent css={css}>{children}</StackComponent>;
};

export default Stack;
