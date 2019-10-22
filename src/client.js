import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ensureReady, After } from '@jaredpalmer/after';
import routes from './routes';
import configureStore from './App/Redux/store/configureStore';
import { Provider } from 'react-redux';
import Subscribe from './App/Components/Subscribe';
import Contact from './App/Components/Contact';

var myScript = JSON.parse(document.getElementById('server-app-state').firstChild.data);
// const preloaded = window.__PRELOADED_STATE__;
// const allRules = Object.assign( preloaded, myScript);
const store = configureStore(myScript);

ensureReady(routes).then(data =>
  hydrate(
    <Provider store={store}>
        <BrowserRouter>
          <After data={data} routes={routes} />
        </BrowserRouter>
        <Subscribe />   
        <Contact/>
      </Provider>,
    document.getElementById('root')
  )
);

if (module.hot) {
  module.hot.accept();
}
