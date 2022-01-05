import React from 'react';
import type { RouteObject } from 'react-router-dom';
import App from '@/App';
import PageError from '@/components/ErrorPage';
export default [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '*',
    element: <PageError />,
  },
] as RouteObject[];
