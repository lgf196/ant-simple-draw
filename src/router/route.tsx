import React from 'react';
import type { RouteObject } from 'react-router-dom';
import App from '@/App';
import PageError from '@/components/ErrorPage';
import Preview from '@/pages/Preview';
export default [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/preview',
    element: <Preview />,
  },
  {
    path: '*',
    element: <PageError />,
  },
] as RouteObject[];
