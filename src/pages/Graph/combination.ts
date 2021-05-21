import { Graph } from '@antv/x6';
import './registeredNode';

export class CombinationGraphics {
  private graph: Graph;
  constructor(graph: Graph) {
    this.graph = graph;
    this.init();
  }
  public init() {
    const c1 = this.graph.createNode({ shape: 'flow-chart-image-rect' });
    const c2 = this.graph.createNode({
      shape: 'flow-chart-title-rect',
    });
    return { c1, c2 };
  }
}
