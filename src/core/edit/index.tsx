import React, { Dispatch, memo } from 'react';
import Grid from './GridComponent';
import Shape from './ShapeComponent';
import style from '../index.module.scss';
import RenderTemplate from '@/core/RenderTemplateComponent';
import { createSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import ContextMenu from './ContextMenuComponent';
import { contextMenuActionMerage, showContextMenuAction } from '@/redux/action/contextMenu';
import MarkLine from './MarkLineComponent';
const Edit = memo(function Edit(props) {
  const dispatch = useDispatch<Dispatch<contextMenuActionMerage>>();
  const [componentListData, curComponent] = useSelector(
    createSelector(
      [(state: storeType) => state.component],
      (component) => [component.componentDataList, component.curComponent] as const,
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
  const handleContextMenu: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    // 计算菜单相对于编辑器的位移
    let target = e.target! as any;
    // 注意react中没有offsetY属性，react将event事件重写了，要想获取到元素的offsetY属性，用nativeEvent
    let top = e.nativeEvent.offsetY;
    let left = e.nativeEvent.offsetX;
    while (target instanceof SVGElement) {
      target = target.parentNode;
    }
    while (!target.className.includes('editor')) {
      left += target.offsetLeft;
      top += target.offsetTop;
      target = target.parentNode;
    }
    dispatch(showContextMenuAction({ top, left }));
  };

  return (
    <div
      id="editor"
      style={{ width: '1200px', height: '750px' }}
      className={style.editor}
      onContextMenu={handleContextMenu}
    >
      <Grid />
      {componentListData.length
        ? componentListData.map((item, index) => (
            <Shape
              key={index}
              style={getShapeStyle(item.style!)}
              element={item}
              defaultStyle={item.style!}
            >
              <RenderTemplate type={item.type} category={item.category} style={item.style!} />
            </Shape>
          ))
        : null}

      <ContextMenu />
      <MarkLine />
    </div>
  );
});

export default Edit;
