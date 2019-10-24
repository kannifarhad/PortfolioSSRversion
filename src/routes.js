import React from 'react';
import { asyncComponent } from '@jaredpalmer/after';

export default [
  {
    path: '/:lang?',
    exact: true,
    component: asyncComponent({
      loader: () => import('./App/Pages/Home'), 
      Placeholder: () => <div>...LOADING...</div>, 
    }),
  },
  {
    path: '/:lang?/:category/page/:page',
    exact: true,
    component: asyncComponent({
      loader: () => import('./App/Pages/PostsList'), 
      Placeholder: () => <div>...LOADING...</div>, 
    }),
  },
  {
    path: '/:lang?/:category?',
    exact: true,
    component: asyncComponent({
      loader: () => import('./App/Pages/PostsList'), 
      Placeholder: () => <div>...LOADING...</div>, 
    }),
  },
  {
    component: asyncComponent({
      loader: () => import('./App/Pages/Error'), 
      Placeholder: () => <div>...LOADING...</div>, 
    }),
  }
];
