import React, { memo } from 'react';
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
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
const Head = memo(function Head() {
  const { editHandle } = useEdit();

  const [tabKey] = useSelector(
    createSelector([(state: storeType) => state.config], (config) => {
      return [config.tabKey] as const;
    }),
  );

  return (
    <div className={style.header}>
      <h1 className={style.title}>
        <a href="/">
          <img src="http://blog.lgf196.top/ant-simple-pro-document/logon.png" alt="" />
          <span>DRAW</span>
        </a>
      </h1>
      {tabKey === '2' && (
        <div className={style.option}>
          {/* <Button type="primary" ghost icon={<DownloadOutlined />}>
          导出画布
        </Button> */}
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
          <Tooltip title="复制">
            <CopyOutlined className={style.icon} onClick={() => editHandle('Ctrl+C')} />
          </Tooltip>
          <Tooltip title="剪切">
            <ScissorOutlined className={style.icon} onClick={() => editHandle('Ctrl+X')} />
          </Tooltip>
          <Tooltip title="粘贴">
            <SnippetsOutlined className={style.icon} onClick={() => editHandle('Ctrl+V')} />
          </Tooltip>
          <Tooltip title="打印">
            <PrinterOutlined className={style.icon} />
          </Tooltip>
        </div>
      )}
    </div>
  );
});

export default Head;
