import React from 'react';
import { asyncComponent } from '@jaredpalmer/after';

import Contact from './App/Components/Contact';
import InnerHeader from './App/Components/InnerHeader';
import Subscribe from './App/Components/Subscribe';
import Home from './App/Pages/Home';
import PostsList from './App/Pages/PostsList';
import PostsPage from './App/Pages/PostsPage';
import Error from './App/Pages/Error';

export default [
  {
    path: '/',
    exact: true,
    component: asyncComponent({
      loader: () => import('./App/Pages/Home'), 
      Placeholder: () => <div>...LOADING...</div>, 
    }),
  },
  {
    path: '/about',
    exact: true,
    component: asyncComponent({
      loader: () => import('./App/About'), 
      Placeholder: () => <div>...LOADING...</div>, 
    }),
  },
  {
    component: Error
  },
];
