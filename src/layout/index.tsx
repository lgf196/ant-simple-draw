import React, { memo } from 'react';
import SliderComponent from '@/layout/slider';
import DropTarget from '@/core/dropTarget';
import style from './index.module.scss';
import Header from '@/layout/head';
const Index = memo(function Index(props) {
  return (
    <div className={style.layout}>
      <Header />
      <div className={style.container}>
        <SliderComponent />
        <DropTarget />
      </div>
    </div>
  );
});

export default Index;
