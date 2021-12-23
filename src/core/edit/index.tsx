import React, { memo, useState, useCallback, useMemo, useRef } from 'react';
import Grid from './GridComponent';
import Shape from './ShapeComponent';
import AreaComponent from './AreaComponent';
import style from '../index.module.scss';
import RenderTemplate from '@/core/RenderTemplateComponent';
import { createSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import ContextMenu from './ContextMenuComponent';
import MarkLine from './MarkLineComponent';
import { useMandatoryUpdate } from '@/hooks';
import { $, getRandomStr } from '@/utils';
import { getComponentRotatedStyle, getStyle } from '@/utils/style';
import { areaDataType } from '@/redux/reduce/compose';
import { commonAttr, commonStyle } from '../config/common';
import createGroupStyle from '@/utils/createGroupStyle';
import { showContextMenuAction } from '@/store/controller/editor/contextMenu';
import { useHotkeys } from 'react-hotkeys-hook';
import { allKeyValueCode, keyCodeType } from '../config/hotKey';
import { cut, copy, paste } from '@/store/controller/editor/copy';
import { redo, undo } from '@/store/controller/editor/snapshot';
import {
  addComponent,
  curComponentAction,
  deleteComponentAction,
} from '@/store/controller/editor/component';
const Edit = memo(function Edit(props) {
  const forUpdate = useMandatoryUpdate();

  const editorPosition = useRef<xyTYpe>({ x: 0, y: 0 });

  const areaPosition = useRef<xyTYpe>({ x: 0, y: 0 });

  const areawh = useRef<whType>({ width: 0, height: 0 });

  const [isShowArea, setIsShowArea] = useState<boolean>(false);

  const dispatch = useDispatch();

  const [componentListData, curComponent] = useSelector(
    createSelector(
      [(state: storeType) => state.component],
      (component) => [component.componentDataList, component.curComponent] as const,
    ),
  );
  /**
   * @description 按键操作
   */
  useHotkeys(allKeyValueCode, (event, handler) => {
    switch (handler.key as keyCodeType) {
      case 'Ctrl+X':
        dispatch(cut());
        break;
      case 'Ctrl+C':
        dispatch(copy());
        break;
      case 'Ctrl+V':
        dispatch(paste(false));
        break;
      case 'Ctrl+Z':
        dispatch(undo());
        break;
      case 'Shift+Z':
        dispatch(redo());
        break;
      case 'Delete':
        break;
      case 'Shift+A':
        break;
      default:
        break;
    }
    console.log(`event`, event, handler);
  });
  /**
   * @description 将值转化为对应的style样式，拼接单位
   */
  const getShapeStyle = (style: React.CSSProperties) => {
    const result = Object.create({});
    ['width', 'height', 'top', 'left', 'rotate'].forEach((attr) => {
      if (attr !== 'rotate') {
        result[attr] = (style as any)[attr] + 'px';
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
    compose({
      style: {
        left,
        top,
        ...updateAreaWh,
      },
      components: areaData,
    });
  };
  /**
   * @description 组合合并组件
   */
  const compose = (areaData: areaDataType) => {
    const components: templateDataType[] = [];
    areaData.components.forEach((component) => {
      if (component.component !== 'Group') {
        components.push(component);
      }
    });
    const groupComponent: templateDataType = {
      category: 'compose',
      type: 'Group',
      id: 'GroupComponent',
      component: 'Group',
      label: 'Group',
      ...commonAttr,
      propValue: components,
      style: {
        ...commonStyle,
        ...areaData.style,
      },
      componentId: getRandomStr(),
    };

    const createGroupStyleComponent = createGroupStyle(groupComponent);
    // 将已经放到 Group 组件数据删除，也就是在 componentData 中删除，因为它们已经放到 Group 组件中了
    dispatch(deleteComponentAction(areaData.components.map((item) => item.componentId!)));

    dispatch(addComponent(createGroupStyleComponent));

    dispatch(curComponentAction(createGroupStyleComponent));

    hideArea();
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
  const getComponentStyle = (style: MergeCSSProperties) => {
    return getStyle(style, ['top', 'left', 'width', 'height', 'rotate']);
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
              <RenderTemplate
                {...item}
                style={getComponentStyle(item.style)}
                propValue={item.propValue!}
              />
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
