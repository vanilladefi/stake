import { rgba } from "polished";
import { styled } from "../../stitches.config";

const Button = styled("button", {
  all: "unset",
  display: "inline-flex",
  fontFamily: "$body",
  fontWeight: "$body",
  color: "$black",
  justifyContent: "center",
  alignItems: "center",
  lineHeight: "$one",
  cursor: "pointer",
  variants: {
    variant: {
      default: {
        // inverse button is default
        backgroundColor: "$text",
        color: "$background",
      },
      primary: {
        backgroundColor: "$primary",
      },
    },
    size: {
      sm: {
        height: "$8",
        px: "$6",
      },
      md: {
        height: "$10",
        px: "$8",
      },
      lg: {
        height: "$12",
        px: "$10",
      },
    },
    outline: {
      true: {
        $$outlineColor: "$colors$text",
        background: "transparent",
        color: "$$outlineColor",
        boxShadow: "0px 0px 0px 1px $$outlineColor",
        "&:hover": {
          backgroundColor: "$$outlineColor",
        },
      },
    },
  },
  compoundVariants: [
    {
      outline: true,
      variant: "primary",
      css: {
        $$outlineColor: "$colors$primary",
      },
    },
    {
      outline: true,
      variant: "default",
      css: {
        $$outlineColor: "$text",
      },
    },
  ],
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export default Button;
