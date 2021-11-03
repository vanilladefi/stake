import { Children } from "react";

import Box from "../Box";
import { styled } from "../../stitches.config";
import type * as Stitches from "@stitches/react";

const StackComponent = styled(Box, {
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "row",
  gap: "$4",
});

const Stack: React.FC<{
  css?: Stitches.CSS;
}> = ({ css, children }) => {
  return (
    <StackComponent css={css}>
      {Children.map(children, (child, index) => (
        <Box>{child}</Box>
      ))}
    </StackComponent>
  );
};

export default Stack;
