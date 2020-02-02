import Document from 'next/document';
import createEmotionServer from 'create-emotion-server';
import createCache from '@emotion/cache';

const cache = createCache();
const { extractCritical } = createEmotionServer(cache);

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const page = renderPage()
    const {css, ids} = extractCritical(page.html)
    const styles = (
      <style
        data-emotion-css={ids.join(` `)}
        dangerouslySetInnerHTML={{ __html: css }}
      />
    );

    return { ...page, styles }
  }
}
