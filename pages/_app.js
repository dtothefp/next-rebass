import App from 'next/app';
import React from 'react';
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache';
import { ThemeProvider } from 'emotion-theming';
import theme from '@rebass/preset';
import { Global, css } from '@emotion/core';
import emotionNormalize from 'emotion-normalize';

const cache = createCache();

Object.assign(theme, {
  colors: {
    text: `#000`,
    background: `#fff`,
    primary: `#000`,
    secondary: `#bf1866`,
    muted: `#379683`,
    gray: `#efefef`,
    highlight: `#51A296`,
  },
});

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <CacheProvider value={cache}>
          <Global
            styles={css`
              ${emotionNormalize}
              html,
              body {
                padding: 0;
                margin: 0;
                min-height: 100%;
                font-family: Helvetica, Arial, sans-serif;
              }
              button.launch {
              background-color: #F9A300;
              border: none;
              height: 40px;
              padding: 5px 15px;
              color: #ffffff;
              font-size: 16px;
              font-weight: 300;
              margin-top: 10px;
              margin-right: 10px;
              }

              button.launch:hover {
              cursor: pointer;
              background-color: #FABD44;
              }

              button.launch {
              background-color: #F9A300;
              border: none;
              height: 40px;
              padding: 5px 15px;
              color: #ffffff;
              font-size: 16px;
              font-weight: 300;
              margin-top: 10px;
              margin-right: 10px;
              }

              button.launch:hover {
              cursor: pointer;
              background-color: #FABD44;
              }

              button.change {
              background-color: #F88F00;
              border: none;
              height: 40px;
              padding: 5px 15px;
              color: #ffffff;
              font-size: 16px;
              font-weight: 300;
              margin-top: 10px;
              margin-right: 10px;
              }

              button.change:hover {
              cursor: pointer;
              background-color: #F89900;
              }

              button:active {
              outline: none;
              border: none;
              }

              button:focus {outline:0;}
              input:focus: {background-color: transparent !important}
            `}
          />
          <Component {...pageProps} />
        </CacheProvider>
      </ThemeProvider>
    );
  }
}
