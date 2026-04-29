import {
  DocumentHeadTags,
  DocumentHeadTagsProps,
  documentGetInitialProps,
} from '@mui/material-nextjs/v15-pagesRouter';
import { DocumentContext, DocumentProps, Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

interface MyDocumentProps extends DocumentProps, DocumentHeadTagsProps {}

export default function MyDocument(props: MyDocumentProps) {
  return (
    <Html lang='en'>
      <Head>
        <DocumentHeadTags {...props} />
        {/* PWA primary color */}
        <link rel='shortcut icon' href='/favicon.ico' />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* Google Analytics 4 */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-ZMGPKCG72S"
        />
        <Script strategy="afterInteractive" id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZMGPKCG72S');
          `}
        </Script>
        {/* Microsoft Clarity */}
        <Script strategy="afterInteractive" id="microsoft-clarity">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "wj83etb125");
          `}
        </Script>
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const finalProps = await documentGetInitialProps(ctx);
  return finalProps;
};
