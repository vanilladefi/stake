import { styled } from "../../stitches.config";
import NextLink from "next/link";
import Text from "../Text";
import { ArrowRight } from "../../assets";

const StyledArrow = styled(ArrowRight, {
  width: "32px",
  height: "32px",
  padding: "5px",
  boxSizing: "border-box",
  "@md": {
    width: "40px",
    height: "40px",
  },
});

const Link = styled(NextLink);

export const ArrowLink = ({
  text = "",
  href = "#",
  onClick,
  newWindow = false,
}: {
  text?: string;
  href?: string;
  newWindow?: boolean;
  onClick?: () => void;
}) => (
  <Link
    css={{
      textDecoration: "underline",
      textUnderlineOffset: "4px",
      textDecorationColor: "$link",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      mb: "$1",
    }}
    as="a"
    href={href}
    target={newWindow ? "_blank" : "_self"}
    rel={newWindow ? "noopener noreferrer" : ""}
    onClick={onClick}
  >
    <StyledArrow />
    <Text
      css={{
        color: "$link",
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
