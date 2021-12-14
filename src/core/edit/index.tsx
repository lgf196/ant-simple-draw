import React, { Dispatch, memo, useState } from 'react';
import Grid from './GridComponent';
import Shape from './ShapeComponent';
import AreaComponent from './AreaComponent';
import style from '../index.module.scss';
import RenderTemplate from '@/core/RenderTemplateComponent';
import { createSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import ContextMenu from './ContextMenuComponent';
import { contextMenuActionMerage, showContextMenuAction } from '@/redux/action/contextMenu';
import MarkLine from './MarkLineComponent';
import { useSetState, useMandatoryUpdate } from '@/hooks';
import { $ } from '@/utils';
const Edit = memo(function Edit(props) {
  const forUpdate = useMandatoryUpdate();

  const [editorPosition, setEditorPosition] = useSetState<xyTYpe>({ x: 0, y: 0 });

  const [areaPosition, setAreaPosition] = useSetState<xyTYpe>({ x: 0, y: 0 });

  const [areawh, setAreawh] = useSetState<whType>({ width: 0, height: 0 });

  const [isShowArea, setIsShowArea] = useState<boolean>(false);

  const dispatch = useDispatch<Dispatch<contextMenuActionMerage>>();

  const [componentListData, curComponent] = useSelector(
    createSelector(
      [(state: storeType) => state.component],
      (component) => [component.componentDataList, component.curComponent] as const,
    ),
  );
  /**
   * @description 将值转化为对应的style样式，拼接单位
   */
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
  /**
   * @description 右键菜单
   */
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
  /**
   * @description 隐藏组选择器
   */
  const hideArea = () => {
    setIsShowArea(false);
    setAreawh({ width: 0, height: 0 });
  };
  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    // 如果没有选中组件 在画布上点击时需要调用 e.preventDefault() 防止触发 drop 事件
    // if (!curComponent) {
    //   e.preventDefault();
    // }
    e.preventDefault();
    hideArea();
    // 获取编辑器的位移信息，每次点击时都需要获取一次。主要是为了方便开发时调试用。
    const rectInfo = $('#editor').getBoundingClientRect();
    setEditorPosition({ x: rectInfo.x, y: rectInfo.y });
    const startX = e.clientX;
    const startY = e.clientY;
    setAreaPosition({
      x: startX - (editorPosition.x || rectInfo.x),
      y: startY - (editorPosition.y || rectInfo.y),
    });
    // 展示选中区域
    setIsShowArea(true);

    const move = (moveEvent: MouseEvent) => {
      setAreawh({
        width: Math.abs(moveEvent.clientX - startX),
        height: Math.abs(moveEvent.clientY - startY),
      });
      if (moveEvent.clientX < startX) {
        setAreaPosition({ x: moveEvent.clientX - editorPosition.x });
      }

      if (moveEvent.clientY < startY) {
        setAreaPosition({ y: moveEvent.clientY - editorPosition.y });
      }
    };

    const up = (e: MouseEvent) => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
      if (e.clientX === startX && e.clientY === startY) {
        hideArea();
        return;
      }
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };
  return (
    <div
      id="editor"
      style={{ width: '1200px', height: '750px' }}
      className={style.editor}
      onContextMenu={handleContextMenu}
      onMouseDown={handleMouseDown}
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
      {isShowArea && <AreaComponent {...areawh} {...areaPosition} />}
    </div>
  );
});

export default Edit;
