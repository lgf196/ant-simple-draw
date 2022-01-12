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
export interface contextMenuListType {
  title: string;
  keyText: keyCodeType;
  icon: React.ReactNode;
  isClick: boolean;
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
        title: '清屏',
        keyText: 'Shift+A',
        icon: <ClearOutlined />,
        isClick: componentDataList.length ? true : false,
      },
    ];

    return contextMenuList;
  }, [componentDataList, curComponent, copyData]);

  const menu = (e: React.MouseEvent, keyCode: keyCodeType, isClick: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isClick) {
      return;
    }
    editHandle(keyCode, { isContextMenuMouse: true });
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
                onClick={(e) => menu(e, item.keyText, item.isClick)}
                key={index}
                style={{
                  borderTop: item.keyText === 'Shift+A' ? '1px solid #0000000f' : 'none',
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
            <li>
              <div className={style.contextmenudes}>
                <SvgIcon iconClass="layer" />
                <span style={{ paddingLeft: '8px' }}>图层层级</span>
              </div>
              <div className={style.contextmenuHotkey}>
                <CaretRightOutlined />
              </div>
            </li>
          </ul>
        </div>
      ) : null}
    </>
  );
});

export default ContextMenu;
