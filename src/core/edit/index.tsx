import React, { memo } from 'react';
import Grid from './grid';
import style from '../index.module.scss';
import RenderTemplate from '@/core/renderTemplate';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
const Edit = memo(function Edit(props) {
  const [componentListData] = useSelector(
    createSelector(
      [(state: storeType) => state.component],
      (user) => [user.componentDataList] as const,
    ),
  );
  return (
    <div id="editor" style={{ width: '1200px', height: '750px' }} className={style.editor}>
      <Grid />
      {componentListData.length &&
        componentListData.map((item, index) => (
          <RenderTemplate type={item.type} category={item.category} key={index} />
        ))}
    </div>
  );
});

export default Edit;
