import { Dom, Graph } from '@antv/x6';
import { shapeName } from './config';
import '@antv/x6-react-shape';
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
    const c3 = this.graph.createNode({
      width: 200,
      height: 50,
      shape: 'react-shape',
      component: 'ReactNodeCompent',
      ports: {
        groups: {
          top: {
            position: 'top',
            attrs: {
              circle: {
                r: 3,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: {
                  visibility: 'hidden',
                },
              },
            },
          },
          right: {
            position: 'right',
            attrs: {
              circle: {
                r: 3,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: {
                  visibility: 'hidden',
                },
              },
            },
          },
          bottom: {
            position: 'bottom',
            attrs: {
              circle: {
                r: 3,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: {
                  visibility: 'hidden',
                },
              },
            },
          },
          left: {
            position: 'left',
            attrs: {
              circle: {
                r: 3,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: {
                  visibility: 'hidden',
                },
              },
            },
          },
        },
        items: [
          {
            group: 'top',
          },
          {
            group: 'right',
          },
          {
            group: 'bottom',
          },
          {
            group: 'left',
          },
        ],
      },
    });
    return { c1, c2, c3 };
  }
}
