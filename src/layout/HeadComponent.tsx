import React, { memo } from 'react';
import style from './layout.module.scss';
import {
  DeleteOutlined,
  UndoOutlined,
  RedoOutlined,
  CopyOutlined,
  ScissorOutlined,
  SnippetsOutlined,
  PrinterOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { Tooltip, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { redo, undo } from '@/store/controller/editor/snapshot';
const Head = memo(function Head() {
  const dispatch = useDispatch();

  const handle = (flag: string) => {
    switch (flag) {
      case 'ClearScreen':
        console.log(`ClearScreen`);
        break;
      case 'Revoke':
        dispatch(undo());
        break;
      case 'Redo':
        dispatch(redo());
        break;
      case 'Copy':
        console.log(`Copy`);
        break;
      case 'Cut':
        console.log(`Cut`);
        break;
      case 'Paste':
        console.log(`Paste`);
        break;
      case 'Print':
        console.log(`Print`);
        break;
      default:
        break;
    }
  };
  return (
    <div className={style.header}>
      <h1 className={style.title}>
        <a href="/">
          <img src="http://blog.lgf196.top/ant-simple-pro-document/logon.png" alt="" />
          <span>DRAW</span>
        </a>
      </h1>
      <div className={style.option}>
        <Button type="primary" ghost icon={<DownloadOutlined />}>
          导出画布
        </Button>
        <Tooltip title="清屏">
          <DeleteOutlined className={style.icon} />
        </Tooltip>
        <Tooltip title="撤销">
          <UndoOutlined className={style.icon} onClick={() => handle('Revoke')} />
        </Tooltip>
        <Tooltip title="重做">
          <RedoOutlined className={style.icon} onClick={() => handle('Redo')} />
        </Tooltip>
        <Tooltip title="复制">
          <CopyOutlined className={style.icon} />
        </Tooltip>
        <Tooltip title="剪切">
          <ScissorOutlined className={style.icon} />
        </Tooltip>
        <Tooltip title="粘贴">
          <SnippetsOutlined className={style.icon} />
        </Tooltip>
        <Tooltip title="打印">
          <PrinterOutlined className={style.icon} />
        </Tooltip>
      </div>
    </div>
  );
});

export default Head;
