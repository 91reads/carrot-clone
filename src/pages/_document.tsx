/* eslint-disable @next/next/no-sync-scripts */
import React from 'react';
import Document, { DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
            <link
              rel="stylesheet"
              as="style"
              href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
            />
            <script
              type="text/javascript"
              src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APPKEY}&libraries=services`}
            ></script>
          </>,
        ],
      };
    } finally {
      sheet.seal();
    }
  }
}

export default MyDocument;
