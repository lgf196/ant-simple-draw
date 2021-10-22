import React, { memo } from 'react';
import Grid from './grid';
import style from '../index.module.scss';
const Edit = memo(function Edit(props) {
  return (
    <div id="editor" style={{ width: '1200px', height: '750px' }} className={style.editor}>
      <Grid />
    </div>
  );
});

export default Edit;
