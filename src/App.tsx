import React, { FC } from 'react';
import Toolbar from '@/layout/HeadComponent';
import Container from '@/layout/SliderComponent';
import style from './app.module.scss';
const App: FC = () => {
  return (
    <>
      <Toolbar />
      <div className={style.mainBody}>
        <Container />
      </div>
    </>
  );
};

export default App;
