import {
  Head, Html, Main,
  NextScript
} from "next/document";
import { getCssText, globalStyles } from "../stitches.config";

const MyDocument = () => {
  globalStyles();
  return (
    <Html>
      <Head>
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default MyDocument
