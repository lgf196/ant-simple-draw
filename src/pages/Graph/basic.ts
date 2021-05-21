import { Graph } from '@antv/x6';
import './registeredNode';

export class BasicGraphics {
  private graph: Graph;
  constructor(graph: Graph) {
    this.graph = graph;
    this.init();
  }
  public init() {
    const r1 = this.graph.createNode({
      shape: 'flow-chart-rect',
      attrs: {
        body: {
          rx: 24,
          ry: 24,
        },
        text: {
          textWrap: {
            text: '起始节点',
          },
        },
      },
    });
    const r2 = this.graph.createNode({
      shape: 'flow-chart-rect',
      attrs: {
        text: {
          textWrap: {
            text: '方形',
          },
        },
      },
    });
    const r3 = this.graph.createNode({
      shape: 'flow-chart-rect',
      width: 52,
      height: 52,
      angle: 45,
      attrs: {
        'edit-text': {
          style: {
            transform: 'rotate(-45deg)',
          },
        },
        text: {
          textWrap: {
            text: '菱形',
          },
          transform: 'rotate(-45deg)',
        },
      },
      ports: {
        groups: {
          top: {
            position: {
              name: 'top',
              args: {
                dx: -26,
              },
            },
          },
          right: {
            position: {
              name: 'right',
              args: {
                dy: -26,
              },
            },
          },
          bottom: {
            position: {
              name: 'bottom',
              args: {
                dx: 26,
              },
            },
          },
          left: {
            position: {
              name: 'left',
              args: {
                dy: 26,
              },
            },
          },
        },
      },
    });
    const r4 = this.graph.createNode({
      shape: 'flow-chart-rect',
      width: 70,
      height: 70,
      attrs: {
        body: {
          rx: 35,
          ry: 35,
        },
        text: {
          textWrap: {
            text: '圆形',
          },
        },
      },
    });
    return { r1, r2, r3, r4 };
  }
}
