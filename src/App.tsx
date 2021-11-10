import React, { FC } from 'react';
import Toolbar from '@/layout/head';
import SliderNav from '@/layout/slider';
import style from './app.module.scss';
import Edit from '@/core/edit';
import { deepCopy, getSingleArrayVal } from '@/utils';
import { useGetCopentConfigList } from './core/config/common';
const App: FC = () => {
  const { baseConfigList } = useGetCopentConfigList();
  const handleDrop: React.DragEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('id');
    const rectInfo = document.querySelector('#editor')!.getBoundingClientRect();
    if (id) {
      const component = deepCopy(
        getSingleArrayVal<templateDateInterface>(baseConfigList, 'id', id),
      ) as templateDataType;
      component.style!.top = e.clientY - rectInfo.y;
      component.style!.left = e.clientX - rectInfo.x;
      console.log(`component`, component);
    }
    console.log(`onDrop`, e, id, rectInfo);
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
