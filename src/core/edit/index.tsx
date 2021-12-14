import React, { Dispatch, memo, useState, useCallback, useMemo, useRef } from 'react';
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
import { getComponentRotatedStyle } from '@/utils/style';
import { composeAction, setAreaDataAction } from '@/redux/action/compose';
const Edit = memo(function Edit(props) {
  const forUpdate = useMandatoryUpdate();

  const editorPosition = useRef<xyTYpe>({ x: 0, y: 0 });

  const areaPosition = useRef<xyTYpe>({ x: 0, y: 0 });

  const areawh = useRef<whType>({ width: 0, height: 0 });

  const [isShowArea, setIsShowArea] = useState<boolean>(false);

  const dispatch = useDispatch<storeDisPatch>();

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
    areawh.current = { width: 0, height: 0 };
  };
  /**
   * @description 得到在组选择器范围内的组件
   */
  const getSelectArea = () => {
    const result: templateDataType[] = [];
    const { x, y } = areaPosition.current;
    // 计算所有的组件数据，判断是否在选中区域内
    componentListData.forEach((component) => {
      const { left, top, width, height } = getComponentRotatedStyle(component.style);
      if (
        x <= left &&
        y <= top &&
        left + width <= x + areawh.current.width &&
        top + height <= y + areawh.current.height
      ) {
        result.push(component);
      }
    });
    return result;
  };
  /**
   * @description 创建组
   */
  const createGroup = () => {
    // 获取选中区域的组件数据
    const areaData = getSelectArea();
    if (areaData.length <= 1) {
      hideArea();
      return;
    }
    // 根据选中区域和区域中每个组件的位移信息来创建 Group 组件
    // 要遍历选择区域的每个组件，获取它们的 left top right bottom 信息来进行比较
    let top = Infinity,
      left = Infinity;
    let right = -Infinity,
      bottom = -Infinity;
    areaData.forEach((component) => {
      let style: MergeCSSProperties = {};
      style = getComponentRotatedStyle(component.style);
      if (style.left < left) left = style.left;
      if (style.top < top) top = style.top;
      if (style.right > right) right = style.right;
      if (style.bottom > bottom) bottom = style.bottom;
    });
    const updateAreaWh = {
      width: right - left,
      height: bottom - top,
    };
    areaPosition.current = {
      x: left,
      y: top,
    };
    areawh.current = updateAreaWh;
    // useRef只会更新数据，但是并不会重新渲染，所以要强制更新渲染
    forUpdate();
    // 设置选中区域位移大小信息和区域内的组件数据
    dispatch(
      setAreaDataAction({
        style: {
          left,
          top,
          ...updateAreaWh,
        },
        components: areaData,
      }),
    );
    dispatch(composeAction());
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

    editorPosition.current = { x: rectInfo.x, y: rectInfo.y };

    const startX = e.clientX;

    const startY = e.clientY;

    areaPosition.current = {
      x: startX - (editorPosition.current.x || rectInfo.x),
      y: startY - (editorPosition.current.y || rectInfo.y),
    };

    // 展示选中区域
    setIsShowArea(true);

    const move = (moveEvent: MouseEvent) => {
      // useRef只会更新数据，但是并不会重新渲染，所以要强制更新渲染
      forUpdate();
      areawh.current = {
        width: Math.abs(moveEvent.clientX - startX),
        height: Math.abs(moveEvent.clientY - startY),
      };
      if (moveEvent.clientX < startX) {
        areaPosition.current.x = moveEvent.clientX - editorPosition.current.x;
      }

      if (moveEvent.clientY < startY) {
        areaPosition.current.y = moveEvent.clientY - editorPosition.current.y;
      }
    };

    const up = (e: MouseEvent) => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
      if (e.clientX === startX && e.clientY === startY) {
        hideArea();
        return;
      }
      createGroup();
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
      {isShowArea && <AreaComponent {...areawh.current} {...areaPosition.current} />}
    </div>
  );
});

export default Edit;
