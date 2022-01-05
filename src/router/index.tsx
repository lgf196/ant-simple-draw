import React, { memo } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './route';
const Router = memo(function Router(props) {
  let element = useRoutes(routes);
  return <>{element}</>;
});

export default Router;
