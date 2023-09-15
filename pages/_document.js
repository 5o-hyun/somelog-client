// app.js가 document로 감싸지면서 head,body등을 수정할수있음
import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } catch (err) {
      console.error(err);
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          {/* https://polyfill.io/v3/url-builder  // nextscript나 Main위에 써줘야함*/}
          {/* 최신문법은 babel로 되는데, map set propmise등은 babel로안되서 Polyfill.io를 써주면 ie에서도 돌아감  */}
          <script src="https://polyfill.io/v3/polyfill.min.js?features=default%2Ces2015%2Ces2016%2Ces2017%2Ces2018%2Ces2019" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
