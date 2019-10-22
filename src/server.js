import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import express from 'express';
import { render } from '@jaredpalmer/after';

import configureStore from './App/Redux/store/configureStore';
import Html from './Html';
import routes from './routes';
import {getConfigs, getLangList, getMenus, getTranslations} from './App/Redux/actions';
import Subscribe from './App/Components/Subscribe';
import Contact from './App/Components/Contact';

const server = express();
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
server.use('/static/', express.static(process.env.RAZZLE_PUBLIC_DIR));
console.log('public',process.env.RAZZLE_PUBLIC_DIR);

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    try {
      const store = configureStore({});

      store.dispatch(getConfigs()).then( async response=> {
            Promise.all([
                await store.dispatch(getTranslations(response.data.lang)).catch(error => { throw error;}),
                await store.dispatch(getMenus(response.data.lang)).catch(error => { throw error; }),
                await store.dispatch(getLangList()).catch(error => { throw error; })
            ]).then(async response => {
              const serverState = store.getState();
              const customRenderer = (node) => {
                                  const App = <Provider store={store}>{node}<Subscribe /><Contact /></Provider>;
                                  const html = renderToString(App);
                                  return {
                                    html,
                                    serverState
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
