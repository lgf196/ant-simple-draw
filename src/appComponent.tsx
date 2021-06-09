import React, { memo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Layout from '@/layout';
import '@/assets/css/reset.css';
import '@/assets/css/update.antd.css';
import '@/assets/css/common.css';
import '@/icons';

const AppComponent = memo(function AppComponent(props) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Layout />
    </DndProvider>
  );
});

export default AppComponent;
