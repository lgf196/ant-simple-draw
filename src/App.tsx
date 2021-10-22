import React, { FC } from 'react';
import Toolbar from '@/layout/head';
import SliderNav from '@/layout/slider';
import style from './app.module.scss';
import Edit from '@/core/edit';
const App: FC = () => {
  const handleDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('id');
    console.log(`onDrop`, e, id);
  };
  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    // console.log(`onDragOver------`, e);
  };
  return (
    <>
      <Toolbar />
      <main className={style.main}>
        <section>
          <SliderNav />
        </section>
        <section className={style.center}>
          <div className={style.content} onDrop={handleDrop} onDragOver={handleDragOver}>
            <Edit />
          </div>
        </section>
        <section className={style.right}>22</section>
      </main>
    </>
  );
};

export default App;
