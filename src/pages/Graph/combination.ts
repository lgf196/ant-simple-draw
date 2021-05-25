import { Graph } from '@antv/x6';
import { shapeName } from './config';
import './registeredNode';

export class CombinationGraphics {
  private graph: Graph;
  constructor(graph: Graph) {
    this.graph = graph;
    this.init();
  }
  public init() {
    const c1 = this.graph.createNode({
      shape: shapeName.flowChartImageRect,
    });
    const c2 = this.graph.createNode({
      shape: shapeName.flowChartTitleRect,
    });
    return { c1, c2 };
  }
}
