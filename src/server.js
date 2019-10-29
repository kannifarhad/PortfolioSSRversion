import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import express from 'express';
import { render } from '@jaredpalmer/after';

import configureStore from './App/Redux/store/configureStore';
import Html from './Html';
import routes from './routes';
import {getConfigs, getLangList, getMenus, getTranslations, langChange} from './App/Redux/actions';
import Subscribe from './App/Components/Subscribe';
import Contact from './App/Components/Contact';
import Helmet from 'react-helmet';
const server = express();
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
server.use('/static/', express.static(process.env.RAZZLE_PUBLIC_DIR));

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    let Urilang = req.params[0].split("/")[0];
    try {
      const store = configureStore({});
      store.dispatch(getConfigs()).then( async response=> {
            const lang = ( typeof response.data.langlist[Urilang] == 'undefined') ? response.data.lang : Urilang;
            //const lang = 'az';
            Promise.all([
                await store.dispatch(langChange(lang)),
                await store.dispatch(getTranslations(lang)).catch(error => { throw error;}),
                await store.dispatch(getMenus(lang)).catch(error => { throw error; }),
                await store.dispatch(getLangList()).catch(error => { throw error; })
            ]).then(async response => {
              const serverState = store.getState();
              const customRenderer = (node) => {
                                  const App = <Provider store={store}>{node}<Subscribe /><Contact /></Provider>;
                                  const html = renderToString(App);
                                  const helmet = Helmet.renderStatic();
                                  return {
                                    html,
                                    serverState,
                                    helmet
                                  };
                              };
              const html = await render({
                  req,
                  res,
                  routes,
                  assets,
                  document: Html,
                  customRenderer,
                  store
              });
              res.send(html);
            });
      });
     
    } catch (error) {
      res.json(error);
    }
  });

export default server;
