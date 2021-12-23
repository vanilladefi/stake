import { styled } from "../../stitches.config";

export const Input = styled("input", {
  // Reset
  appearance: "none",
  borderWidth: "0",
  boxSizing: "border-box",
  fontFamily: "inherit",
  boxShadow: `0 1px 0 0px $colors$lightStroke`,
  outline: "none",
  width: "100%",
  flex: "1",
  fontWeight: "$body",
  backgroundColor: "$mauve4",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  px: "$2",
  fontSize: "$md",
  lineHeight: 1,
  color: "$text",
  height: 35,
  WebkitTapHighlightColor: "rgba(0,0,0,0)",
  "&[type=number]": {
    "-moz-appearance": "textfield",
    "-webkit-appearance": "none",
    margin: 0,
  },
  "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
    "-moz-appearance": "textfield",
    "-webkit-appearance": "none",
  },
  "&::before": {
    boxSizing: "border-box",
  },
  "&::after": {
    boxSizing: "border-box",
  },
  fontVariantNumeric: "tabular-nums",

  "&:-webkit-autofill": {
    boxShadow: "inset 0 0 0 1px $colors$blue6, inset 0 0 0 100px $colors$blue3",
  },

  "&:-webkit-autofill::first-line": {
    fontFamily: "$untitled",
    color: "$mauve12",
  },
  "&::placeholder": {
    color: "$offWhite50",
    opacity: 0.3,
  },
  "&:focus": {
    boxShadow: `0 1px 0 0px $colors$muted`,
    "&:-webkit-autofill": {
      boxShadow: `0 0 0 1px $colors$muted`,
    },
  },
  "&:disabled": {
    pointerEvents: "none",
    backgroundColor: "$mauve2",
    color: "$mauve8",
    cursor: "not-allowed",
    "&::placeholder": {
      color: "$mauve7",
    },
  },
  "&:read-only": {
    backgroundColor: "$mauve2",
    "&:focus": {
      boxShadow: "inset 0px 0px 0px 1px $colors$mauve7",
    },
  },

  variants: {
    size: {
      md: {
        height: "$8",
        fontSize: "$1",
        lineHeight: "$sizes$5",
        "&:-webkit-autofill::first-line": {
          fontSize: "$1",
        },
      },
      lg: {
        height: "$10",
        fontSize: "$2xl",
        lineHeight: "$sizes$6",
        "&:-webkit-autofill::first-line": {
          fontSize: "$3",
        },
      },
      xl: {
        height: "$14",
        fontSize: "$2xl",
        lineHeight: "$sizes$9",
        "&:-webkit-autofill::first-line": {
          fontSize: "$3",
        },
      },
    },
    variant: {
      ghost: {
        boxShadow: "none",
        backgroundColor: "transparent",
        "@hover": {
          "&:hover": {
            boxShadow: "inset 0 0 0 1px $colors$mauve7",
          },
        },
        "&:focus": {
          backgroundColor: "$loContrast",
          boxShadow: `0 0 0 1px $colors$mauve10`,
        },
        "&:disabled": {
          backgroundColor: "transparent",
        },
        "&:read-only": {
          backgroundColor: "transparent",
        },
      },
      bordered: {
        boxShadow: "0 0 0 1px $colors$extraMuted",
        backgroundColor: "transparent",
        "@hover": {
          "&:hover": {
            boxShadow: "inset 0 0 0 1px $colors$mauve7",
          },
        },
        "&:focus": {
          backgroundColor: "$loContrast",
          boxShadow: `0 0 0 1px $colors$extraMuted`,
        },
        "&:disabled": {
          backgroundColor: "transparent",
        },
        "&:read-only": {
          backgroundColor: "transparent",
        },
      },
    },
    state: {
      invalid: {
        boxShadow: "inset 0 0 0 1px $colors$red7",
        "&:focus": {
          boxShadow: "inset 0px 0px 0px 1px $colors$red8, 0px 0px 0px 1px $colors$red8",
        },
      },
      valid: {
        boxShadow: "inset 0 0 0 1px $colors$green7",
        "&:focus": {
          boxShadow: "inset 0px 0px 0px 1px $colors$green8, 0px 0px 0px 1px $colors$green8",
        },
      },
    },
    cursor: {
      default: {
        cursor: "default",
        "&:focus": {
          cursor: "text",
        },
      },
      text: {
        cursor: "text",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export default Input;
