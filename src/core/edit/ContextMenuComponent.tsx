import React, { memo, useMemo } from 'react';
import style from '../index.module.scss';
import {
  CopyOutlined,
  DeleteOutlined,
  SnippetsOutlined,
  ScissorOutlined,
  ClearOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { Dispatch } from 'redux';
import { componentActionMerage, isClickComponentAction } from '@/redux/action/component';
import {
  contextMenuActionMerage,
  // hideContextMenuAction
} from '@/redux/action/contextMenu';
import { hideContextMenuAction } from '@/store/controller/contextMenu';
const ContextMenu = memo(function ContextMenu(props) {
  const dispatch = useDispatch();

  const [curComponent, left, top, menuShow, componentDataList] = useSelector(
    createSelector(
      [(state: storeType) => state.component, (state: storeType) => state.contextMenu],
      ({ componentDataList, curComponent }, { left, top, menuShow }) =>
        [curComponent, left, top, menuShow, componentDataList] as const,
    ),
  );
  const renderList = useMemo(() => {
    const isClick = curComponent ? true : false;
    let contextMenuList = [
      { title: '复制', keyText: 'Ctrl+C', icon: <CopyOutlined />, flag: 'CopyOutlined', isClick },
      {
        title: '粘贴',
        keyText: 'Ctrl+C',
        icon: <SnippetsOutlined />,
        flag: 'SnippetsOutlined',
        isClick,
      },
      {
        title: '剪切',
        keyText: 'Ctrl+C',
        icon: <ScissorOutlined />,
        flag: 'ScissorOutlined',
        isClick,
      },
      {
        title: '删除',
        keyText: 'Ctrl+C',
        icon: <DeleteOutlined />,
        flag: 'DeleteOutlined',
        isClick,
      },
      {
        title: '清屏',
        keyText: 'Ctrl+C',
        icon: <ClearOutlined />,
        flag: 'ClearOutlined',
        isClick: componentDataList.length ? true : false,
      },
    ];

    return contextMenuList;
  }, [componentDataList, curComponent]);

  const menu = (e: React.MouseEvent, flag: string, isClick: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isClick) {
      return;
    }
    switch (flag) {
      case 'CopyOutlined':
        console.log(`CopyOutlined`);
        break;
      case 'SnippetsOutlined':
        console.log(`SnippetsOutlined`);
        break;
      case 'ScissorOutlined':
        console.log(`ScissorOutlined`);
        break;
      case 'DeleteOutlined':
        console.log(`DeleteOutlined`);
        break;
      case 'ClearOutlined':
        console.log(`ClearOutlined`);
        break;
      default:
        break;
    }
    dispatch(hideContextMenuAction());
  };
  return (
    <>
      {menuShow ? (
        <div
          className={style.contextmenu}
          style={{ top: top + 'px', left: left + 'px' }}
          onMouseDown={(e) => {
            // 不写这个的话，会触发组合器 onMousemove事件
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <ul
            onMouseUp={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // dispatch(isClickComponentAction(true));
            }}
          >
            {renderList.map((item, index) => (
              <li
                onClick={(e) => menu(e, item.flag, item.isClick)}
                key={index}
                style={{
                  borderTop: item.flag === 'ClearOutlined' ? '1px solid #0000000f' : 'none',
                  cursor: item.isClick === true ? 'pointer' : 'not-allowed',
                  color: item.isClick === true ? '#000000' : '#00000040',
                }}
              >
                <div className={style.contextmenudes}>
                  {item.icon}
                  <span style={{ paddingLeft: '8px' }}>{item.title}</span>
                </div>
                <div className={style.contextmenuHotkey}>{item.keyText}</div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
});

export default ContextMenu;
