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
            {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            <script src="https://unpkg.com/react/umd/react.production.min.js"></script>

            <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"></script> */}
          </>,
        ],
      };
    } finally {
      sheet.seal();
    }
  }
}

export default MyDocument;
