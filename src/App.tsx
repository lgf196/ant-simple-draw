import React, { useState, useEffect } from 'react';
import { UnorderedListOutlined } from '@ant-design/icons';
import FlowGraph from '@/pages/Graph';
import ToolBar from '@/pages/components/ToolBar';
import ConfigPanel from '@/pages/components/ConfigPanel';
import { Drawer, notification } from 'antd';
import './assets/css/reset.css';
import './assets/css/global.css';
import styles from './app.module.scss';

const closeStyle: React.CSSProperties = {
  right: '0px',
};

export default function App() {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(true);

  const getContainerSize = () => {
    return {
      width: document.body.offsetWidth - 250,
      height: document.body.offsetHeight - 45,
    };
  };

  useEffect(() => {
    notification.open({
      message: 'simple-diagrh',
      duration: null,
      description: (
        <>
          <p>
            作者， antd社区成员之一，开源项目
            <a href="https://github.com/lgf196/ant-simple-pro">
              《ant-simple-pro》
            </a>
            ，
            <a href="https://github.com/lgf196/simple-diagrh">
              《simple-diagrh》
            </a>
            作者，一个菜鸟码农
          </p>
        </>
      ),
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
    const graph = FlowGraph.init();
    setIsReady(true);

    const resizeFn = () => {
      const { width, height } = getContainerSize();
      graph.resize(width, height);
    };
    resizeFn();

    window.addEventListener('resize', resizeFn);
    return () => {
      window.removeEventListener('resize', resizeFn);
    };
  }, []);

  const onClose = () => setVisible(false);

  return (
    <div className={styles.wrap}>
      <div className={styles.content}>
        <div id="stencil" className={styles.sider} />
        <div className={styles.panel}>
          <div className={styles.toolbar}>{isReady && <ToolBar />}</div>
          <div id="container" className="x6-graph" />
        </div>
        <Drawer
          placement="right"
          mask={false}
          onClose={onClose}
          visible={visible}
        >
          <div className={styles.config}>{isReady && <ConfigPanel />}</div>
        </Drawer>
        <div
          className={styles.close}
          style={!visible ? closeStyle : undefined}
          onClick={() => setVisible(true)}
        >
          <UnorderedListOutlined />
        </div>
      </div>
    </div>
  );
}
