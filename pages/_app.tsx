import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Provider } from "urql";
import Head from "next/head";

import { darkTheme } from "../stitches.config";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Box from "../components/Box";
import "../styles/globals.css";
import client, { ssrCache } from "../urql";

function MyApp({ Component, pageProps }: AppProps) {
  console.log("paage", pageProps);
  if (pageProps.urqlState) {
    ssrCache.restoreData(pageProps.urqlState);
  }
  return (
    <>
      <Head>
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
        <meta name="theme-color" content="#000000" />
        <title>Vanilla DeFi</title>
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
