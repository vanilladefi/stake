import { styled } from "../../stitches.config";

const StyledButton = styled(
  "button",
  {
    all: "unset",
    WebkitTapHighlightColor: "rgba(0,0,0,0)",
    "::before": {
      boxSizing: "border-box",
    },
    "::after": {
      boxSizing: "border-box",
    },
    display: "inline-flex",
    fontFamily: "$body",
    fontWeight: "$body",
    color: "$black",
    justifyContent: "center",
    alignItems: "center",
    lineHeight: 1.1,
    cursor: "pointer",
    boxShadow: "0px 0px 0px 1px $$borderColor",
    variants: {
      variant: {
        default: {
          color: "$background",
          backgroundColor: "$textA",
          boxShadow: "0px 0px 0px 1px $colors$textA",
        },
        primary: {
          color: "$black",
          backgroundColor: "$primary",
          boxShadow: "0px 0px 0px 1px $colors$primary",
        },
        bordered: {
          color: "$primary",
          backgroundColor: "$background",
          boxShadow: "0px 0px 0px 1px $colors$extraMuted",
        },
      },
      size: {
        sm: {
          height: "$7",
          px: "$3",
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
          backgroundColor: "transparent",
        },
      },
      active: {
        true: {},
      },
      uppercase: {
        true: {
          textTransform: "uppercase",
        },
      },
      ghost: {
        true: {
          boxShadow: "none",
          background: "transparent",
        },
      },
    },
    compoundVariants: [
      {
        outline: true,
        variant: "primary",
        css: {
          color: "$primary",
          boxShadow: "0px 0px 0px 1px $colors$primary",
          backgroundColor: "transparent",
        },
      },
      {
        outline: true,
        variant: "default",
        css: {
          backgroundColor: "transparent",
          color: "$text",
        },
      },
      {
        variant: "default",
        outline: true,
        active: true,
        css: {
          backgroundColor: "$textA",
          color: "$background",
        },
      },
      {
        variant: "primary",
        outline: true,
        active: true,
        css: {
          backgroundColor: "$primary",
          color: "$black",
        },
      },
      {
        variant: "primary",
        ghost: true,
        css: {
          color: "$primary",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,.1)",
            boxShadow: "none",
          },
          "&:active": {
            backgroundColor: "$mauve8",
            boxShadow: "none",
          },
          "&:focus": {
            boxShadow: "none",
          },
        },
      },
    ],
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  },
  { as: "button" }
);

export default StyledButton;
