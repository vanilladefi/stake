import { darken } from "@theme-ui/color";
import type { Theme } from "theme-ui";

export const theme: Theme = {
  config: {
    initialColorModeName: 'light',
  },
  breakpoints: ['40em', '52em', '64em', '78em'],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: 'PolySans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'Moche, sans-serif',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 18, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 400,
    bold: 700,
  },
  layout: {
    container: {
      maxWidth: [
        "layout",
        null,
        "layoutPlus"
      ],
      width: "100%",
      mx: "auto",
      px: 3
    }
  },
  lineHeights: {
    body: 1.5,
    heading: 0.85,
  },
  colors: {
    black: '#10070F',
    text: '#10070F',
    background: '#F1EBD4',
    primary: '#E5B754',
    secondary: '#30c',
    muted: '#4F3428',
    extraMuted: '#DDCDB9',
    modes: {
      dark: {
        text: '#F1EBD4',
        background: '#10070F',
        primary: '#E5B754',
        secondary: '#30c',
        muted: '#AF9E88',
        extraMuted: '#776464',
      }
    }
  },
  buttons: {
    default: {
      borderRadius: 0
    },
    primary: {
      color: 'black',
      borderRadius: 0,
      '&:hover': {
        background: darken('primary', 0.2)
      }
    }
  },
  text: {
    heading: {
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      textTransform: 'uppercase',
    },
  },
  sizes: {
    "widePlus": 2048,
    "wide": 1536,
    "layoutPlus": 1260,
    "layout": 1024,
    "copyUltra": 980,
    "copyPlus": 768,
    "copy": 680,
    "narrowPlus": 600,
    "narrow": 512
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
    a: {
      color: 'text',
      textDecoration: 'underline',
      '&:visited': {
        color: 'text'
      },
      '&:hover': {
        color: 'text',
        textDecoration: 'none'
      }
    },
    // h1: {
    //   variant: 'text.heading',
    //   fontSize: 5,
    // },
    // h2: {
    //   variant: 'text.heading',
    //   fontSize: 4,
    // },
    // h3: {
    //   variant: 'text.heading',
    //   fontSize: 3,
    // },
    // h4: {
    //   variant: 'text.heading',
    //   fontSize: 2,
    // },
    // h5: {
    //   variant: 'text.heading',
    //   fontSize: 1,
    // },
    // h6: {
    //   variant: 'text.heading',
    //   fontSize: 0,
    // },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit',
      },
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
  },
}