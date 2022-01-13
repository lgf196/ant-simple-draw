import React, { memo, useMemo } from 'react';
import style from '../index.module.scss';
import {
  CopyOutlined,
  DeleteOutlined,
  SnippetsOutlined,
  ScissorOutlined,
  ClearOutlined,
  CaretRightOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { hideContextMenuAction } from '@/store/controller/editor/contextMenu';
import useEdit from './useEdit';
import { keyCodeType } from '../config/hotKey';
import SvgIcon from '@/components/SvgIcon';

export interface contextMenuListItem {
  title: string;
  keyText: keyCodeType;
  icon?: React.ReactNode;
  isClick: boolean;
  childrenIcon?: React.ReactNode;
}
export interface contextMenuListType extends contextMenuListItem {
  children?: contextMenuListItem[];
}
const ContextMenu = memo(function ContextMenu(props) {
  const dispatch = useDispatch();

  const { editHandle } = useEdit();

  const [curComponent, left, top, menuShow, componentDataList, copyData] = useSelector(
    createSelector(
      [
        (state: storeType) => state.component,
        (state: storeType) => state.contextMenu,
        (state: storeType) => state.copys,
      ],
      ({ componentDataList, curComponent }, { left, top, menuShow }, { copyData }) =>
        [curComponent, left, top, menuShow, componentDataList, copyData] as const,
    ),
  );
  const renderList = useMemo(() => {
    const isClick = curComponent ? true : false;
    let contextMenuList: contextMenuListType[] = [
      {
        title: '复制',
        keyText: 'Ctrl+C',
        icon: <CopyOutlined />,
        isClick,
      },
      {
        title: '粘贴',
        keyText: 'Ctrl+V',
        icon: <SnippetsOutlined />,
        isClick: copyData ? true : false,
      },
      {
        title: '剪切',
        keyText: 'Ctrl+X',
        icon: <ScissorOutlined />,
        isClick,
      },
      {
        title: '删除',
        keyText: 'Delete',
        icon: <DeleteOutlined />,
        isClick,
      },
      {
        title: '图层层级',
        keyText: 'Delete',
        icon: <SvgIcon iconClass="layer" />,
        isClick,
        childrenIcon: <CaretRightOutlined />,
        children: [
          {
            title: '移到顶层',
            keyText: 'Ctrl+Shift+↑',
            isClick,
          },
          {
            title: '上移一层',
            keyText: 'Delete',
            isClick,
          },
          {
            title: '下移一层',
            keyText: 'Delete',
            isClick,
          },
          {
            title: '移到底层',
            keyText: 'Ctrl+Shift+↓',
            isClick,
          },
        ],
      },
      {
        title: '清屏',
        keyText: 'Shift+A',
        icon: <ClearOutlined />,
        isClick: componentDataList.length ? true : false,
      },
    ];

    return contextMenuList;
  }, [componentDataList, curComponent, copyData]);

  const menu = (e: React.MouseEvent, item: contextMenuListType) => {
    const { keyText, isClick } = item;
    e.preventDefault();
    e.stopPropagation();
    if (!isClick || item.children?.length) {
      return;
    }
    editHandle(keyText, { isContextMenuMouse: true });
    dispatch(hideContextMenuAction());
  };

  const ContextMenuItem = (data: contextMenuListType[]) => {
    return data.map((item, index) => {
      return (
        <li
          onClick={(e) => menu(e, item)}
          key={index}
          style={{
            borderTop: item.keyText === 'Shift+A' ? '1px solid #0000000f' : 'none',
            cursor: item.isClick === true ? 'pointer' : 'not-allowed',
            color: item.isClick === true ? '#000000' : '#00000040',
          }}
        >
          <div className={style.contextmenudes}>
            {item.icon ? <span style={{ paddingRight: '8px' }}>{item.icon}</span> : null}
            <span>{item.title}</span>
          </div>
          <div className={style.contextmenuHotkey}>
            {item.childrenIcon ? item.childrenIcon : item.keyText}
          </div>
          {item.children ? <ul className={style.child}>{ContextMenuItem(item.children)}</ul> : null}
        </li>
      );
    });
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
            {ContextMenuItem(renderList)}
          </ul>
        </div>
      ) : null}
    </>
  );
});

export default ContextMenu;
