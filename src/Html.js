import React from 'react';
import { AfterRoot, AfterData } from '@jaredpalmer/after';

class CustomDocument extends React.Component {
  static async getInitialProps({ assets, data, renderPage }) {
    const page = await renderPage();
    return { assets, data, ...page };
  }

  render() {
    const { helmet, assets, data, serverState } = this.props;
    console.log('Helmet', helmet);
    // get attributes from React Helmet
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    return (
      <html {...htmlAttrs}>
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          <link rel="stylesheet" href='/static/Assets/css/style.css' />
          <link rel="stylesheet" href='/static/Assets/fonts/font/stylesheet.css' />
          <link rel="stylesheet" href='/static/Assets/fonts/glyp/css/Glyphter.css' />
          <link rel="stylesheet" href='/static/Assets/css/jquery.fancybox.css?v=2.1.5' />
          <link rel="stylesheet" href='/static/Assets/css/owl.carousel.css' />
          <link rel="stylesheet" href='/static/Assets/css/owl.theme.css' />
          {assets.client.css && ( <link rel="stylesheet" href={assets.client.css} /> )}
        </head>
        <body {...bodyAttrs}>
          <AfterRoot />
          <AfterData data={data} />
          <span dangerouslySetInnerHTML={ { __html: `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(serverState)}</script>` } } />
          <script  type="text/javascript" src={assets.client.js} defer crossOrigin="anonymous" />
          <script  type="text/javascript" src='/static/Assets/js/jquery-2.1.1.min.js'  />
          <script  type="text/javascript" src='/static/Assets/js/jquery.fancybox.js?v=2.1.5'  />
          <script  type="text/javascript" src='/static/Assets/js/custom.js'  />
          <script  type="text/javascript" src='/static/Assets/js/TweenMax.min.js'  />
          <script  type="text/javascript" src='/static/Assets/js/MorphSVGPlugin.min.js'  />
          <script  type="text/javascript" src='/static/Assets/js/index.js'  />
        </body>
      </html>
    );
  }
}

export default CustomDocument;