import { styled } from "../../stitches.config";
import Link from "../Link";
import Text from "../Text";
import { ArrowRight } from "../../assets";

const StyledArrow = styled(ArrowRight, {
  width: "40px",
  height: "40px",
  padding: "5px",
  boxSizing: "border-box",
});

export const ArrowLink = ({
  text = "",
  href = "#",
  onClick,
}: {
  text?: string;
  href?: string;
  onClick?: () => void;
}) => (
  <Link
    css={{
      textDecoration: "underline",
      textUnderlineOffset: "2px",
      textDecorationColor: "$primary",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      mb: "$1",
    }}
    as="a"
    href={href}
    onClick={onClick}
  >
    <StyledArrow />
    <Text
      css={{
        color: "$primary",
        fontSize: "$xl",
        pb: "5px",
        ml: "$5",
        "@md": {
          ml: "$5",
          fontSize: "$xxl",
        },
      }}
    >
      {text}
    </Text>
  </Link>
);
