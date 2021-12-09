import Document, {
  DocumentContext, Head, Html, Main,
  NextScript
} from "next/document";
import { getCssText, globalStyles } from "../stitches.config";


class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }
  render() {
    globalStyles();
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
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
}

export default MyDocument;
