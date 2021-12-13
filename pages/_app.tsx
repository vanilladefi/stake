import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import useOrigin from "../lib/hooks/useOrigin";
import { useRouter } from "next/router";
import { Provider } from "urql";
import Box from "../components/Box";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { darkTheme } from "../stitches.config";
import "../styles/globals.css";
import client from "../urql";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const origin = useOrigin();
  const shareImg = "/images/share-image.png";
  return (
    <>
      <Head>
        <meta charSet="utf-8" />

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="format-detection" content="telephone=no" />
        <meta property="og:url" content={`${origin}${router.asPath}`} />
        <meta
          property="og:title"
          content="Vanilla — Decentralized asset manager for Web3"
        />
        <meta
          name="twitter:title"
          content="Vanilla — Decentralized asset manager for Web3"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vanilladefi" />

        <meta
          name="description"
          content="Vanilla is an on-chain investment pool managed by the best investors."
        />
        <meta
          property="og:description"
          content="Vanilla is an on-chain investment pool managed by the best investors."
        />
        <meta
          name="twitter:description"
          content="Vanilla is an on-chain investment pool managed by the best investors."
        />

        <meta property="og:image" content={`${origin}${shareImg}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content={`${origin}${shareImg}`} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <meta name="apple-mobile-web-app-title" content="Vanilla" />
        <meta name="application-name" content="Vanilla" />
        <meta name="msapplication-TileColor" content="#000000" />

        <meta
          name="theme-color"
          content="#10070F"
          media="(prefers-color-scheme: dark)"
        />
        <meta
          name="theme-color"
          content="#F8F5EC"
          media="(prefers-color-scheme: light)"
        />

        <title>Vanilla — Decentralized asset manager for Web3</title>
        <meta
          name="description"
          content="The world’s first decentralised asset manager"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider value={client}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          value={{
            dark: darkTheme.className,
            light: "light",
          }}
        >
          <Box>
            <Navigation />
            <Component {...pageProps} />
            <Footer />
          </Box>
        </ThemeProvider>
      </Provider>
    </>
  );
}
export default MyApp;
