import App from 'next/app';
import React from 'react';
import { StylesProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    return { pageProps };
  }

  componentDidMount() {
    const serverJss = document.querySelector(`#jss-server-side`);

    if (serverJss && serverJss.parentNode) {
      serverJss.parentNode.removeChild(serverJss);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <StylesProvider injectFirst>
        <CssBaseline />
        <Component {...pageProps} />
      </StylesProvider>
    );
  }
}
