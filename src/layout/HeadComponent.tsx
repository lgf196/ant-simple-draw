import React, { FC, memo } from 'react';
import style from './layout.module.scss';
import {
  ClearOutlined,
  CopyOutlined,
  ScissorOutlined,
  SnippetsOutlined,
  PrinterOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { Tooltip, Button } from 'antd';
import SvgComponent from '@/components/SvgIcon';
import useEdit from '@/core/edit/useEdit';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { useNavigate, Link } from 'react-router-dom';
import { saveLocally, setModelAction } from '@/store/controller/config';
export interface HeadType {
  /**
   * @description 类型，更具不同的类型显示，不同的模块
   */
  type?: string;
}
const Head: FC<HeadType> = memo(function Head({ type = 'edit' }) {
  const dispatch = useDispatch<any>();
  const { editHandle } = useEdit();
  const [componentDataList, canvasInformation] = useSelector(
    createSelector(
      [(state: storeType) => state.component, (state: storeType) => state.config],
      (component, config) => {
        return [component.componentDataList, config.canvasInformation] as const;
      },
    ),
  );
  const operate = () => {
    if (!componentDataList.length) {
      return;
    }
    dispatch(setModelAction('preview'));
    dispatch(saveLocally()).then(() => {
      window.open('/preview?a=1');
    });
  };

  return (
    <div className={style.header}>
      <h1 className={style.title}>
        <a href="/">
          <img src="http://blog.lgf196.top/ant-simple-pro-document/logon.png" alt="" />
          <span>DRAW</span>
        </a>
      </h1>
      {type === 'edit' ? (
        <div className={style.option}>
          <button className={style.preview} onClick={operate}>
            预览
          </button>
          <Tooltip title="清屏">
            <ClearOutlined className={style.icon} onClick={() => editHandle('Shift+A')} />
          </Tooltip>
          <Tooltip title="撤销">
            <SvgComponent
              iconClass="undo"
              fill="#2f54eb"
              onClick={() => editHandle('Ctrl+Z')}
              className={style.icon}
            />
          </Tooltip>
          <Tooltip title="恢复">
            <SvgComponent
              iconClass="redo"
              fill="#2f54eb"
              onClick={() => editHandle('Shift+Z')}
              className={style.icon}
            />
          </Tooltip>
          <Tooltip title="打印">
            <PrinterOutlined className={style.icon} />
          </Tooltip>
        </div>
      ) : null}
    </div>
  );
});

export default Head;
