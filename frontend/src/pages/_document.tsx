import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";
import { ServerStyleSheets } from "@material-ui/styles";

class CustomDocument extends Document {
  static async getInitialProps(
    context: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(context);

    return initialProps;
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            rel="stylesheet"
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

CustomDocument.getInitialProps = async (context) => {
  const styleSheets = new ServerStyleSheets();

  const renderPageReference = context.renderPage;

  context.renderPage = () =>
    renderPageReference({
      enhanceApp: (App) => (props) => styleSheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(context);

  return {
    ...initialProps,
    styles: [
      <>
        {initialProps.styles}
        {styleSheets.getStyleElement()}
      </>,
    ],
  };
};

export default CustomDocument;
