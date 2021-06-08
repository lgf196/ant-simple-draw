import { shapeName } from '@/config';
import { Dom } from '@antv/x6';
export const roundedRectangle = {
  shape: shapeName.flowChartRect,
  attrs: {
    body: {
      rx: 24,
      ry: 24,
    },
    text: {
      textWrap: {
        text: '',
      },
    },
  },
};
export const rectangle = {
  shape: shapeName.flowChartRect,
  attrs: {
    text: {
      textWrap: {
        text: '',
      },
    },
  },
};
export const diamond = {
  shape: shapeName.flowChartRect,
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
        text: '',
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
};
export const circle = {
  shape: shapeName.flowChartRect,
  width: 70,
  height: 70,
  attrs: {
    body: {
      rx: 35,
      ry: 35,
    },
    text: {
      textWrap: {
        text: '',
      },
    },
  },
};
export const ellipse = {
  shape: 'ellipse',
  width: 90,
  height: 45,
  attrs: {
    body: {
      stroke: '#5F95FF',
      strokeWidth: 1,
      fill: 'rgba(95,149,255,0.05)',
    },
    fo: {
      refWidth: '100%',
      refHeight: '100%',
    },
    foBody: {
      xmlns: Dom.ns.xhtml,
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
    'edit-text': {
      contenteditable: 'false',
      class: 'x6-edit-text',
      style: {
        width: '100%',
        textAlign: 'center',
        fontSize: 12,
        color: 'rgba(0,0,0,0.85)',
      },
    },
    text: {
      fontSize: 12,
      fill: 'rgba(0,0,0,0.85)',
      textWrap: {
        text: '',
        width: -10,
      },
    },
  },
  markup: [
    {
      tagName: 'ellipse',
      selector: 'body',
    },
    {
      tagName: 'text',
      selector: 'text',
    },
    {
      tagName: 'foreignObject',
      selector: 'fo',
      children: [
        {
          ns: Dom.ns.xhtml,
          tagName: 'body',
          selector: 'foBody',
          children: [
            {
              tagName: 'div',
              selector: 'edit-text',
            },
          ],
        },
      ],
    },
  ],
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
};
export default { roundedRectangle, rectangle, diamond, circle, ellipse };
