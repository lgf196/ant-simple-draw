import { Graph, Dom } from '@antv/x6';
import '@antv/x6-react-shape';
import React from 'react';
import { shapeName } from './config';
import ReactNodeCompent from '@/pages/reactNode';

export const FlowChartRect = Graph.registerNode(shapeName.flowChartRect, {
  inherit: 'rect',
  width: 80,
  height: 42,
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
      tagName: 'rect',
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
});

export const FlowChartImageRect = Graph.registerNode(
  shapeName.flowChartImageRect,
  {
    inherit: 'rect',
    width: 200,
    height: 60,
    attrs: {
      body: {
        stroke: '#5F95FF',
        strokeWidth: 1,
        fill: 'rgba(95,149,255,0.05)',
      },
      image: {
        'xlink:href':
          'http://blog.lgf196.top/ant-simple-pro-document/logon.png',
        width: 16,
        height: 16,
        x: 12,
        y: 12,
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
      title: {
        text: 'ant-simple-pro',
        refX: 40,
        refY: 14,
        fill: 'rgba(0,0,0,0.85)',
        fontSize: 12,
        'text-anchor': 'start',
        ellipsis: true,
      },
      text: {
        text: '支持3大框架',
        refX: 40,
        refY: 38,
        fontSize: 12,
        fill: 'rgba(0,0,0,0.6)',
        ellipsis: true,
        'text-anchor': 'start',
      },
    },
    markup: [
      {
        tagName: 'rect',
        selector: 'body',
      },
      {
        tagName: 'image',
        selector: 'image',
      },
      {
        tagName: 'text',
        selector: 'title',
      },
      {
        tagName: 'text',
        selector: 'text',
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
  },
);

export const FlowChartTitleRect = Graph.registerNode(
  shapeName.flowChartTitleRect,
  {
    inherit: 'rect',
    width: 200,
    height: 68,
    attrs: {
      body: {
        stroke: '#5F95FF',
        strokeWidth: 1,
        fill: 'rgba(95,149,255,0.05)',
      },
      head: {
        refWidth: '100%',
        stroke: 'transparent',
        height: 28,
        fill: 'rgba(95,149,255,0.7)',
      },
      image: {
        'xlink:href':
          'http://blog.lgf196.top/ant-simple-pro-document/logon.png',
        height: 16,
        x: 6,
        y: 6,
      },
      title: {
        text: 'ant-simple-pro',
        refX: 30,
        refY: 9,
        fill: '#ffffff',
        fontSize: 12,
        'text-anchor': 'start',
      },
      text: {
        text: '支持3大框架',
        refX: 8,
        refY: 45,
        fontSize: 12,
        fill: 'rgba(0,0,0,0.6)',
        'text-anchor': 'start',
      },
    },
    markup: [
      {
        tagName: 'rect',
        selector: 'body',
      },
      {
        tagName: 'rect',
        selector: 'head',
      },
      {
        tagName: 'image',
        selector: 'image',
      },
      {
        tagName: 'text',
        selector: 'title',
      },
      {
        tagName: 'text',
        selector: 'text',
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
  },
);

/**
 *自定义react节点
 */
export const ReactNode = Graph.registerReactComponent(
  'ReactNodeCompent',
  <ReactNodeCompent text="ant-simple-pro" />,
);
