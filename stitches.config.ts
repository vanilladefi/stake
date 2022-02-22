// stitches.config.ts
import type Stitches from "@stitches/react";
import { createStitches } from "@stitches/react";
import { transparentize, darken, lighten } from "polished";

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      black: "#311E15",
      text: "#311E15",
      textSecondary: "#311d15",
      textA: "#5a411c",
      background: "#fffbef",
      backgroundA: transparentize(0.1, "#F1EBD4"),
      primary: "#E5B754",
      primaryDark: darken(0.3, "#E5B754"),
      primaryLight: lighten(0.3, "#E5B754"),
      secondary: "#30c",
      muted: "#514130",
      extraMuted: "#DDCDB9",
      offWhite85: "#DDCDB9",
      offWhite50: "#AF9E88",
      lightStroke: transparentize(0.5, "#776464"),
      green: "#498717",
      red: "#FD5247",
      backgroundSecondary: "#FDFBF5",
      link: "#612F00",
      outline: "#000",
      tableZebra: "rgba(244,239,220,.7)",
      modalCurtainBg: "rgba(20,8,0,.81)",
    },
    fonts: {
      body: 'PolySans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      heading: "Moche, sans-serif",
      monospace: "Menlo, monospace",
    },
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1.05rem",
      lg: "1.125rem",
      xl: "1.25rem",
      xxl: "1.35rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
      "7xl": "4.5rem",
      "8xl": "6rem",
      "9xl": "8rem",
      default: "$md",
    },
    space: {
      px: "1px",
      0.5: "0.125rem",
      1: "0.25rem",
      1.5: "0.375rem",
      2: "0.5rem",
      2.5: "0.625rem",
      3: "0.75rem",
      3.5: "0.875rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      7: "1.75rem",
      8: "2rem",
      9: "2.25rem",
      10: "2.5rem",
      12: "3rem",
      14: "3.5rem",
      16: "4rem",
      20: "5rem",
      24: "6rem",
      28: "7rem",
      32: "8rem",
      36: "9rem",
      40: "10rem",
      44: "11rem",
      48: "12rem",
      52: "13rem",
      56: "14rem",
      60: "15rem",
      64: "16rem",
      72: "18rem",
      80: "20rem",
      96: "24rem",
      widePlus: "2048px",
      wide: "1536px",
      layoutPlus: "1260px",
      layout: "1024px",
      copyUltra: "980px",
      copyPlus: "768px",
      copy: "680px",
      narrowPlus: "600px",
      narrow: "512px",
      xs: "20rem",
      sm: "24rem",
      md: "28rem",
      lg: "32rem",
      xl: "36rem",
      "2xl": "42rem",
      "3xl": "48rem",
      "4xl": "56rem",
      "5xl": "64rem",
      "6xl": "72rem",
      "7xl": "80rem",
      "8xl": "90rem",
    },
    sizes: {
      px: "1px",
      0.5: "0.125rem",
      1: "0.25rem",
      1.5: "0.375rem",
      2: "0.5rem",
      2.5: "0.625rem",
      3: "0.75rem",
      3.5: "0.875rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      7: "1.75rem",
      8: "2rem",
      9: "2.25rem",
      10: "2.5rem",
      12: "3rem",
      14: "3.5rem",
      16: "4rem",
      20: "5rem",
      24: "6rem",
      28: "7rem",
      32: "8rem",
      36: "9rem",
      40: "10rem",
      44: "11rem",
      48: "12rem",
      52: "13rem",
      56: "14rem",
      60: "15rem",
      64: "16rem",
      72: "18rem",
      80: "20rem",
      96: "24rem",
      max: "max-content",
      min: "min-content",
      full: "100%",
      "3xs": "14rem",
      "2xs": "16rem",
      xs: "20rem",
      sm: "24rem",
      md: "28rem",
      lg: "32rem",
      xl: "36rem",
      "2xl": "42rem",
      "3xl": "48rem",
      "4xl": "56rem",
      "5xl": "64rem",
      "6xl": "72rem",
      "7xl": "80rem",
      "8xl": "90rem",
    },
    radii: {
      none: "0",
      sm: "0.125rem",
      base: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      "2xl": "1rem",
      "3xl": "1.5rem",
      full: "9999px",
    },
    fontWeights: {
      body: 300,
      heading: 400,
      bold: 700,
    },
    lineHeights: {
      one: 1,
      body: 1.5,
      heading: 0.85,
    },
    letterSpacings: {},
    borderWidths: {},
    borderStyles: {},
    shadows: {},
    zIndices: {},
    transitions: {},
  },
  media: {
    dark: "(prefers-color-scheme: dark)",
    sm: "(min-width: 30em)",
    md: "(min-width: 48em)",
    lg: "(min-width: 62em)",
    xl: "(min-width: 80em)",
    "2xl": "(min-width: 96em)",
  },
  utils: {
    // Abbreviated margin properties
    m: (
      value: Stitches.ScaleValue<"space"> | Stitches.PropertyValue<"margin">
    ) => ({
      margin: value,
    }),
    mt: (
      value: Stitches.ScaleValue<"space"> | Stitches.PropertyValue<"marginTop">
    ) => ({
      marginTop: value,
    }),
    mr: (
      value:
        | Stitches.ScaleValue<"space">
        | Stitches.PropertyValue<"marginRight">
    ) => ({
      marginRight: value,
    }),
    mb: (
      value:
        | Stitches.ScaleValue<"space">
        | Stitches.PropertyValue<"marginBottom">
    ) => ({
      marginBottom: value,
    }),
    ml: (
      value: Stitches.ScaleValue<"space"> | Stitches.PropertyValue<"marginLeft">
    ) => ({
      marginLeft: value,
    }),
    mx: (
      value:
        | Stitches.ScaleValue<"space">
        | Stitches.PropertyValue<"marginLeft" | "marginRight">
    ) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (
      value:
        | Stitches.ScaleValue<"space">
        | Stitches.PropertyValue<"marginTop" | "marginBottom">
    ) => ({
      marginTop: value,
      marginBottom: value,
    }),
    // Abbreviated margin properties
    p: (
      value: Stitches.ScaleValue<"space"> | Stitches.PropertyValue<"padding">
    ) => ({
      padding: value,
    }),
    pt: (
      value: Stitches.ScaleValue<"space"> | Stitches.PropertyValue<"paddingTop">
    ) => ({
      paddingTop: value,
    }),
    pr: (
      value:
        | Stitches.ScaleValue<"space">
        | Stitches.PropertyValue<"paddingRight">
    ) => ({
      paddingRight: value,
    }),
    pb: (
      value:
        | Stitches.ScaleValue<"space">
        | Stitches.PropertyValue<"paddingBottom">
    ) => ({
      paddingBottom: value,
    }),
    pl: (
      value:
        | Stitches.ScaleValue<"space">
        | Stitches.PropertyValue<"paddingLeft">
    ) => ({
      paddingLeft: value,
    }),
    px: (
      value:
        | Stitches.ScaleValue<"space">
        | Stitches.PropertyValue<"paddingLeft" | "paddingRight">
    ) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (
      value:
        | Stitches.ScaleValue<"space">
        | Stitches.PropertyValue<"paddingTop" | "paddingBottom">
    ) => ({
      paddingTop: value,
      paddingBottom: value,
    }),

    // A property for applying width/height together
    size: (
      value:
        | Stitches.ScaleValue<"space">
        | Stitches.PropertyValue<"width" | "height">
    ) => ({
      width: value,
      height: value,
    }),
    // color: (value: Stitches.PropertyValue<'color'> | Stitches.PropertyValue<'width' | 'height'> => ({
    //   color: value
    // }),

    // A property to apply linear gradient
    linearGradient: (value: Stitches.ScaleValue<"space">) => ({
      backgroundImage: `linear-gradient(${value})`,
    }),

    // An abbreviated property for border-radius
    br: (value: Stitches.ScaleValue<"space">) => ({
      borderRadius: value,
    }),
  },
});

export const darkTheme = createTheme("dark", {
  colors: {
    text: "#F1EBD4",
    textA: transparentize(0.1, "#F1EBD4"),
    textSecondary: "#ddcdb9",
    background: "#10070F",
    backgroundA: transparentize(0.1, "#10070F"),
    primary: "#E5B754",
    green: "#A1F161",
    red: "#FD5247",
    secondary: "#30c",
    muted: "#AF9E88",
    extraMuted: "#776464",
    offWhite50: "#776464",
    backgroundSecondary: "#1c1217",
    link: "#E5B754",
    outline: "#fff",
    tableZebra: "rgba(255, 199, 148, 0.07)",
    modalCurtainBg: "rgba(9,3,1,.87)",
  },
});

export const globalStyles = globalCss({
  "html, body": {
    backgroundColor: "$background",
    color: "$text",
    margin: 0,
    padding: 0,
    fontFamily: "$body",
    fontSize: "$md",
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",

    "--toastify-color-light": "$colors$background",
    "--toastify-color-dark": "$colors$text",
    "--toastify-color-info": "$colors$text",
    "--toastify-color-success": "$colors$green",
    "--toastify-color-warning": "$colors$primary",
    "--toastify-color-error": "$colors$red",
    "--toastify-color-transparent": "rgba(255, 255, 255, 0.7)",
    "--toastify-icon-color-info": "$colors$text",
    "--toastify-icon-color-success": "$colors$green",
    "--toastify-icon-color-warning": "$colors$primary",
    "--toastify-icon-color-error": "$colors$red",
    "--toastify-toast-width": "320px",
    "--toastify-toast-background": "$colors$background",
    "--toastify-text-color-light": "$colors$text",
    "--toastify-text-color-dark": "$colors$text",
    ".Toastify__toast": {
      borderRadius: 0,
      border: "1px solid $colors$extraMuted",
    },
    ".Toastify__close-button--light": {
      color: "$colors$text",
      opacity: 1,
    },
    ".Toastify__toast-container": {
      minWidth: "320px",
      width: "100%",
      maxWidth: "780px",
    },
    ".Toastify__progress-bar": {
      height: "2px",
    },
    ".dark &": {
      backgroundImage:
        "radial-gradient(50.04% 28.4% at 6.4% -3.32%, #231308 0%, #10070F 100%)",
      backgroundPosition: "top left",
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% 3500px",
    },
  },
});
