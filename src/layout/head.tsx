import React, { memo } from 'react';
import style from './index.module.scss';
import {
  DeleteOutlined,
  UndoOutlined,
  RedoOutlined,
  CopyOutlined,
  ScissorOutlined,
  SnippetsOutlined,
  CameraOutlined,
  PrinterOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { Tooltip, Button } from 'antd';
import { DataUri } from '@antv/x6';
import FlowGraph from '@/graph';

const Head = memo(function Head(props) {
  const handleClick = (name: string) => {
    const { graph } = FlowGraph;
    switch (name) {
      case 'undo':
        graph.history.undo();
        break;
      case 'redo':
        graph.history.redo();
        break;
      case 'delete':
        graph.clearCells();
        break;
      case 'save':
        graph.toPNG((datauri: string) => {
          DataUri.downloadDataUri(datauri, 'ant-simple-draw.png');
        });
        break;
      case 'print':
        graph.printPreview();
        break;
      case 'copy':
        FlowGraph.copy();
        break;
      case 'cut':
        FlowGraph.cut();
        break;
      case 'paste':
        FlowGraph.paste();
        break;
      default:
        break;
    }
  };
  return (
    <div className={style.header}>
      <h1 className={style.title}>
        <a href="lgf196.top/draw/">
          <img
            src="http://blog.lgf196.top/ant-simple-pro-document/logon.png"
            alt=""
          />
          <span>DRAW</span>
        </a>
      </h1>
      <div className={style.option}>
        <Button
          type="primary"
          ghost
          icon={<DownloadOutlined />}
          onClick={() => handleClick('save')}
        >
          导出画布
        </Button>
        <Tooltip title="清屏">
          <DeleteOutlined
            className={style.icon}
            onClick={() => handleClick('delete')}
          />
        </Tooltip>
        <Tooltip title="撤销">
          <UndoOutlined
            className={style.icon}
            onClick={() => handleClick('undo')}
          />
        </Tooltip>
        <Tooltip title="重做">
          <RedoOutlined
            className={style.icon}
            onClick={() => handleClick('redo')}
          />
        </Tooltip>
        <Tooltip title="复制">
          <CopyOutlined
            className={style.icon}
            onClick={() => handleClick('copy')}
          />
        </Tooltip>
        <Tooltip title="剪切">
          <ScissorOutlined
            className={style.icon}
            onClick={() => handleClick('cut')}
          />
        </Tooltip>
        <Tooltip title="粘贴">
          <SnippetsOutlined
            className={style.icon}
            onClick={() => handleClick('paste')}
          />
        </Tooltip>
        <Tooltip title="打印">
          <PrinterOutlined
            className={style.icon}
            onClick={() => handleClick('print')}
          />
        </Tooltip>
      </div>
    </div>
  );
});

export default Head;
