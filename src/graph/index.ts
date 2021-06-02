import { Graph, FunctionExt, Shape } from '@antv/x6';
export default class FlowGraph {
  public static graph: Graph;
  public static init() {
    this.graph = new Graph({
      container: document.getElementById('container')!,
      width: 1000,
      height: 800,
      resizing: {
        enabled: true,
      },
      grid: {
        size: 10,
        visible: true,
        type: 'doubleMesh',
        args: [
          {
            color: '#cccccc',
            thickness: 1,
          },
          {
            color: '#5F95FF',
            thickness: 1,
            factor: 4,
          },
        ],
      },
      selecting: {
        enabled: true,
        multiple: true,
        rubberband: true,
        movable: true,
        showNodeSelectionBox: true,
        filter: ['groupNode'],
      },
      connecting: {
        anchor: 'center',
        connectionPoint: 'anchor',
        allowBlank: false,
        highlight: true,
        snap: true,
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#5F95FF',
                strokeWidth: 1,
                targetMarker: {
                  name: 'classic',
                  size: 8,
                },
              },
            },
            router: {
              name: 'manhattan',
            },
            zIndex: 0,
          });
        },
        validateConnection({
          sourceView,
          targetView,
          sourceMagnet,
          targetMagnet,
        }) {
          if (sourceView === targetView) {
            return false;
          }
          if (!sourceMagnet) {
            return false;
          }
          if (!targetMagnet) {
            return false;
          }
          return true;
        },
      },
      highlighting: {
        magnetAvailable: {
          name: 'stroke',
          args: {
            padding: 4,
            attrs: {
              strokeWidth: 4,
              stroke: 'rgba(223,234,255)',
            },
          },
        },
      },
      snapline: true,
      history: true,
      clipboard: {
        enabled: true,
      },
      keyboard: {
        enabled: true,
      },
      embedding: {
        enabled: true,
        findParent({ node }) {
          const bbox = node.getBBox();
          return this.getNodes().filter((node) => {
            // 只有 data.parent 为 true 的节点才是父节点
            const data = node.getData<any>();
            if (data && data.parent) {
              const targetBBox = node.getBBox();
              return bbox.isIntersectWithRect(targetBBox);
            }
            return false;
          });
        },
      },
    });
    this.initEvent();
    return this.graph;
  }

  public static isGraphReady() {
    return !!this.graph;
  }

  public static copy() {
    const { graph } = this;
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.copy(cells);
    }
    return false;
  }

  public static cut() {
    const { graph } = this;
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.cut(cells);
    }
    return false;
  }

  public static paste() {
    const { graph } = this;
    if (!graph.isClipboardEmpty()) {
      const cells = graph.paste({ offset: 32 });
      graph.cleanSelection();
      graph.select(cells);
    }
    return false;
  }

  private static showPorts(ports: NodeListOf<SVGAElement>, show: boolean) {
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = show ? 'visible' : 'hidden';
    }
  }

  private static initEvent() {
    const { graph } = this;
    const container = document.getElementById('container')!;

    graph.on('node:contextmenu', ({ cell, view }) => {
      const oldText = cell.attr('text/textWrap/text') as string;
      const elem = view.container.querySelector('.x6-edit-text') as HTMLElement;
      if (elem == null) {
        return;
      }
      cell.attr('text/style/display', 'none');
      if (elem) {
        elem.style.display = '';
        elem.contentEditable = 'true';
        elem.innerText = oldText;
        elem.focus();
      }
      const onBlur = () => {
        cell.attr('text/textWrap/text', elem.innerText);
        cell.attr('text/style/display', '');
        elem.style.display = 'none';
        elem.contentEditable = 'false';
      };
      elem.addEventListener('blur', () => {
        onBlur();
        elem.removeEventListener('blur', onBlur);
      });
    });
    graph.on(
      'node:mouseenter',
      FunctionExt.debounce(() => {
        const ports = container.querySelectorAll(
          '.x6-port-body',
        ) as NodeListOf<SVGAElement>;
        this.showPorts(ports, true);
      }),
      500,
    );
    graph.on('node:mouseleave', () => {
      const ports = container.querySelectorAll(
        '.x6-port-body',
      ) as NodeListOf<SVGAElement>;
      this.showPorts(ports, false);
    });

    graph.on('node:collapse', ({ node, e }: any) => {
      e.stopPropagation();
      node.toggleCollapse();
      const collapsed = node.isCollapsed();
      const cells = node.getDescendants();
      cells.forEach((n: any) => {
        if (collapsed) {
          n.hide();
        } else {
          n.show();
        }
      });
    });

    graph.on('node:embedded', ({ cell }) => {
      if (cell.shape !== 'groupNode') {
        cell.toFront();
      }
    });

    graph.bindKey('backspace', () => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.removeCells(cells);
      }
    });
  }
}
