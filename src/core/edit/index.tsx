import React, { memo } from 'react';
import Grid from './grid';
import Shape from './shape';
import style from '../index.module.scss';
import RenderTemplate from '@/core/renderTemplate';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
const Edit = memo(function Edit(props) {
  const [componentListData] = useSelector(
    createSelector(
      [(state: storeType) => state.component],
      (component) => [component.componentDataList] as const,
    ),
  );
  const getShapeStyle = (style: React.CSSProperties) => {
    const result: React.CSSProperties = {};
    ['width', 'height', 'top', 'left', 'rotate'].forEach((attr) => {
      if (attr !== 'rotate') {
        (result as any)[attr] = (style as any)[attr] + 'px';
      } else {
        result.transform = 'rotate(' + style[attr] + 'deg)';
      }
    });
    return result;
  };

  return (
    <div id="editor" style={{ width: '1200px', height: '750px' }} className={style.editor}>
      <Grid />
      {componentListData.length &&
        componentListData.map((item, index) => (
          <Shape
            key={index}
            style={getShapeStyle(item.style!)}
            element={item}
            defaultStyle={item.style!}
          >
            <RenderTemplate type={item.type} category={item.category} style={item.style!} />
          </Shape>
        ))}
    </div>
  );
});

export default Edit;
