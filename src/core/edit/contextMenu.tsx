import React, { memo } from 'react';
import style from '../index.module.scss';
import { CopyOutlined, DeleteOutlined, SnippetsOutlined, ScissorOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
const ContextMenu = memo(function ContextMenu(props) {
  const [curComponent, left, top, menuShow] = useSelector(
    createSelector(
      [(state: storeType) => state.component, (state: storeType) => state.contextMenu],
      ({ curComponent }, { left, top, menuShow }) => [curComponent, left, top, menuShow] as const,
    ),
  );
  const menu: React.MouseEventHandler<HTMLLIElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`3232333`, 3232333);
  };
  return (
    <>
      {menuShow ? (
        <div className={style.contextmenu} style={{ top: top + 'px', left: left + 'px' }}>
          <ul
            onMouseUp={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <li onClick={menu}>
              <div className={style.contextmenudes}>
                <CopyOutlined />
                <span style={{ paddingLeft: '8px' }}>复制</span>
              </div>
              <div className={style.contextmenuHotkey}>Ctrl+C</div>
            </li>
            <li>
              <div className={style.contextmenudes}>
                <SnippetsOutlined />
                <span style={{ paddingLeft: '8px' }}>粘贴</span>
              </div>
              <div className={style.contextmenuHotkey}>Ctrl+C</div>
            </li>
            <li>
              <div className={style.contextmenudes}>
                <ScissorOutlined />
                <span style={{ paddingLeft: '8px' }}>剪切</span>
              </div>
              <div className={style.contextmenuHotkey}>Ctrl+C</div>
            </li>
            <li>
              <div className={style.contextmenudes}>
                <DeleteOutlined />
                <span style={{ paddingLeft: '8px' }}>删除</span>
              </div>
              <div className={style.contextmenuHotkey}>Ctrl+C</div>
            </li>
          </ul>
        </div>
      ) : null}
    </>
  );
});

export default ContextMenu;
