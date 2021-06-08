import { useEffect } from 'react';
import FlowGraph from '@/graph';
import { DataUri } from '@antv/x6';

const useKeydown = (dependencies: any[]) => {
  useEffect(() => {
    if (FlowGraph.isGraphReady()) {
      const { graph } = FlowGraph;
      const { history } = graph;
      graph.bindKey(['meta+z', 'ctrl+z'], () => {
        if (history.canUndo()) {
          history.undo();
        }
        return false;
      });
      graph.bindKey(['meta+shift+z', 'ctrl+y'], () => {
        if (history.canRedo()) {
          history.redo();
        }
        return false;
      });
      graph.bindKey(['meta+d', 'ctrl+d'], () => {
        graph.clearCells();
        return false;
      });
      graph.bindKey(['meta+s', 'ctrl+s'], () => {
        graph.toPNG((datauri: string) => {
          DataUri.downloadDataUri(datauri, 'ant-simple-draw.png');
        });
        return false;
      });
      graph.bindKey(['meta+p', 'ctrl+p'], () => {
        graph.printPreview();
        return false;
      });
      graph.bindKey(['meta+c', 'ctrl+c'], () => FlowGraph.copy());
      graph.bindKey(['meta+v', 'ctrl+v'], () => FlowGraph.paste());
      graph.bindKey(['meta+x', 'ctrl+x'], () => FlowGraph.cut());
    }
  }, dependencies);
};
export default useKeydown;
