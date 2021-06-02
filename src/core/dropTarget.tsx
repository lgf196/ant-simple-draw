import React, { memo, useState, useCallback, useRef, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import style from './index.module.scss';
import { Drawer } from 'antd';
import { useOnResize } from '@/hooks';
import { shapeName } from '@/config';
import FlowGraph from '@/graph';
import { formatGroupInfoToNodeMeta } from '@/utils/formatGroupInfoToNodeMeta';
import { tempalteType } from '@/graphTemplateType';
import ConfigPanel from '@/core/ConfigPanel';
import { UnorderedListOutlined } from '@ant-design/icons';
import '@/graph/registeredNode';
import '@/graph/reactRegisteredNode';

const closeStyle: React.CSSProperties = {
  right: '0px',
};

const DropTarget = memo(function DropTarget(props) {
  const [visible, setVisible] = useState<boolean>(true);
  const [isRender, setIsRender] = useState<boolean>(false);
  const { width, height } = useOnResize();
  console.log(`width`, width);
  const onClose = () => setVisible(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [collectProps, droper] = useDrop({
    accept: 'Box',
    collect: (minoter) => ({
      isOver: minoter.isOver(),
      canDrop: minoter.canDrop(),
      item: minoter.getItem(),
    }),
    drop: (item: tempalteType, monitor) => {
      // 拖拽组件当前offset
      const currentMouseOffset = monitor.getClientOffset();
      // 拖拽组件初始拖拽时offset
      const sourceMouseOffset = monitor.getInitialClientOffset();
      const sourceElementOffset = monitor.getInitialSourceClientOffset();
      const diffX = sourceMouseOffset!.x - sourceElementOffset!.x;
      const diffY = sourceMouseOffset!.y - sourceElementOffset!.y;
      const x = currentMouseOffset!.x - diffX;
      const y = currentMouseOffset!.y - diffY;
      // 将实际的x,y这样的坐标转换画布本地坐标
      const point = FlowGraph.graph.clientToLocal(x, y);
      const createNodeData = formatGroupInfoToNodeMeta(item, point);
      FlowGraph.graph.addNode(createNodeData);
      console.log(`item`, item);
    },
  });

  useEffect(() => {
    const graph = FlowGraph.init();
    if (graph) {
      setIsRender(true);
    }
  }, []);

  useEffect(() => {
    if (FlowGraph.isGraphReady()) {
      FlowGraph.graph.resize(width - 300, height);
    }
  }, [width, height]);
  return (
    <div className={style.warp}>
      <div
        ref={(ele) => {
          containerRef.current = ele;
          droper(ele);
        }}
        className={style.dropTarget}
        id="container"
      ></div>
      <Drawer
        placement="right"
        mask={false}
        onClose={onClose}
        visible={visible}
        width={300}
      >
        <div className={style.config}>{isRender && <ConfigPanel />}</div>
      </Drawer>
      <div
        className={style.close}
        style={!visible ? closeStyle : undefined}
        onClick={() => setVisible(true)}
      >
        <UnorderedListOutlined />
      </div>
    </div>
  );
});

export default DropTarget;
