import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet as StyledSheet } from 'styled-components';
import { ServerStyleSheets as MaterialSheet } from '@material-ui/styles';
import csso from 'csso';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const materialSheet = new MaterialSheet();
    const styledSheet = new StyledSheet();

    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () => originalRenderPage({
      enhanceApp: (App) => (props) => materialSheet.collect(styledSheet.collectStyles(<App {...props} />)),
    });

    try {
      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            <style
              dangerouslySetInnerHTML={{__html: csso.minify(materialSheet.toString()).css}}
              id="jss-server-side"
            />
            {styledSheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      styledSheet.seal();
    }
  }

  render() {
    return (
      <html>
        <Head>
          <meta
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            name="viewport" />
          <meta
            content="#ffffff"
            name="theme-color" />
          <link
            href="/static/casper_logo.jpg"
            rel="apple-touch-icon" />
          <meta
            content="POS Web App"
            name="apple-mobile-web-app-title" />
          <meta
            content="default"
            name="apple-mobile-web-app-status-bar-style" />
          <meta
            content="yes"
            name="apple-mobile-web-app-capable" />
        </Head>
        <body style={{overflow: `hidden`}}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
