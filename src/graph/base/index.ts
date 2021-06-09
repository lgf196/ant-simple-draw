import { shapeName } from '@/config';
import { Dom } from '@antv/x6';
import { portsConfig } from '@/config/portsConfig';
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
  ports: portsConfig,
};

export const noRulepath = {
  shape: 'path',
  width: 90,
  height: 70,
  path: 'M 0 5 10 0 C 20 0 20 20 10 20 L 0 15 Z',
  attrs: {
    body: {
      fill: 'rgba(95,149,255,0.05)',
      stroke: '#5F95FF',
    },
  },
};

export const heart = {
  shape: 'path',
  width: 70,
  height: 70,
  path: 'M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z',
  attrs: {
    body: {
      fill: 'rgba(95,149,255,0.05)',
      stroke: '#5F95FF',
    },
  },
};

export const fivePointedStar = {
  shape: 'path',
  width: 70,
  height: 70,
  path: 'M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956C22.602,0.567,25.338,0.567,26.285,2.486z',
  attrs: {
    body: {
      fill: 'rgba(95,149,255,0.05)',
      stroke: '#5F95FF',
    },
  },
};

export const lightning = {
  shape: 'path',
  width: 70,
  height: 80,
  path: 'M22.9,48a0.8,0.8,0,0,1-.22,0,0.76,0.76,0,0,1-.56-0.73V27.67H8a1.5,1.5,0,0,1-1.43-2L14.51,0.54A0.77,0.77,0,0,1,15.25,0H32.78a0.76,0.76,0,0,1,.68,1.1L26.09,15.83H41a0.78,0.78,0,0,1,.68.39,0.75,0.75,0,0,1,0,.76L23.56,47.62A0.77,0.77,0,0,1,22.9,48ZM15.41,1L7.54,26a0.5,0.5,0,0,0,.48.65H22.34a0.77,0.77,0,0,1,.77.77v19L40.57,16.83H25.7a0.76,0.76,0,0,1-.68-1.1L32.39,1h-17ZM40.78,16.48h0Zm-14.86-.3h0ZM15.46,0.84h0Zm17.1-.19h0Z',
  attrs: {
    body: {
      fill: 'rgba(95,149,255,0.05)',
      stroke: '#5F95FF',
    },
  },
};

export const forward = {
  shape: 'path',
  width: 70,
  height: 70,
  path: 'M3,44.1a2.5,2.5,0,0,1-2.5-2.5V7.35a2.5,2.5,0,0,1,3.95-2L28.48,22.44a2.5,2.5,0,0,1,0,4.07l-0.29-.41,0.29,0.41L4.42,43.63A2.49,2.49,0,0,1,3,44.1ZM3,5.85A1.51,1.51,0,0,0,2.29,6a1.48,1.48,0,0,0-.81,1.33V41.6a1.5,1.5,0,0,0,2.37,1.22L27.9,25.7a1.5,1.5,0,0,0,0-2.44L3.84,6.13A1.49,1.49,0,0,0,3,5.85Z"/><path d="M45,45.47H38a2.5,2.5,0,0,1-2.5-2.5V6A2.5,2.5,0,0,1,38,3.47h7A2.5,2.5,0,0,1,47.53,6V43A2.5,2.5,0,0,1,45,45.47Zm-7-41A1.5,1.5,0,0,0,36.53,6V43a1.5,1.5,0,0,0,1.5,1.5h7a1.5,1.5,0,0,0,1.5-1.5V6A1.5,1.5,0,0,0,45,4.47H38Z',
  attrs: {
    body: {
      fill: 'rgba(95,149,255,0.05)',
      stroke: '#5F95FF',
    },
  },
};

export const forwardDouble = {
  shape: 'path',
  width: 70,
  height: 70,
  path: 'M3,43.62a2.5,2.5,0,0,1-2.5-2.5V6.88a2.5,2.5,0,0,1,4-2L28.49,22a2.5,2.5,0,0,1,0,4.07L4.44,43.16A2.49,2.49,0,0,1,3,43.62ZM3,5.37a1.51,1.51,0,0,0-.69.17,1.48,1.48,0,0,0-.81,1.33V41.12a1.5,1.5,0,0,0,2.37,1.22L27.91,25.22a1.5,1.5,0,0,0,0-2.44L3.86,5.66A1.49,1.49,0,0,0,3,5.37Z"/><path d="M21,43.62a2.5,2.5,0,0,1-2.5-2.5V32.2a0.5,0.5,0,0,1,1,0v8.92a1.5,1.5,0,0,0,2.37,1.22L45.88,25.22a1.5,1.5,0,0,0,0-2.44L21.83,5.66a1.5,1.5,0,0,0-2.37,1.22V15.8a0.5,0.5,0,1,1-1,0V6.88a2.5,2.5,0,0,1,3.95-2L46.46,22a2.5,2.5,0,0,1,0,4.07L22.41,43.16A2.49,2.49,0,0,1,21,43.62Z',
  attrs: {
    body: {
      fill: 'rgba(95,149,255,0.05)',
      stroke: '#5F95FF',
    },
  },
};

export const panorama = {
  shape: 'path',
  width: 60,
  height: 70,
  path: 'M39,47H9a0.5,0.5,0,0,1-.47-0.68c1.81-4.82,2.8-12.75,2.8-22.32s-1-17.51-2.8-22.32A0.5,0.5,0,0,1,9,1H39a0.5,0.5,0,0,1,.47.68c-1.81,4.82-2.8,12.75-2.8,22.32s1,17.51,2.8,22.32A0.5,0.5,0,0,1,39,47ZM9.71,46H38.29c-1.69-5-2.62-12.74-2.62-22S36.6,7,38.29,2H9.71c1.69,5,2.62,12.74,2.62,22S11.4,41,9.71,46Z',
  attrs: {
    body: {
      fill: 'rgba(95,149,255,0.05)',
      stroke: '#5F95FF',
    },
  },
};
export const pause = {
  shape: 'path',
  width: 70,
  height: 70,
  path: 'M18.5,44H5.5A2.5,2.5,0,0,1,3,41.5V6.5A2.5,2.5,0,0,1,5.5,4h13A2.5,2.5,0,0,1,21,6.5v35A2.5,2.5,0,0,1,18.5,44ZM5.5,5A1.5,1.5,0,0,0,4,6.5v35A1.5,1.5,0,0,0,5.5,43h13A1.5,1.5,0,0,0,20,41.5V6.5A1.5,1.5,0,0,0,18.5,5H5.5Z"/><path d="M42.5,44h-13A2.5,2.5,0,0,1,27,41.5V6.5A2.5,2.5,0,0,1,29.5,4h13A2.5,2.5,0,0,1,45,6.5v35A2.5,2.5,0,0,1,42.5,44ZM29.5,5A1.5,1.5,0,0,0,28,6.5v35A1.5,1.5,0,0,0,29.5,43h13A1.5,1.5,0,0,0,44,41.5V6.5A1.5,1.5,0,0,0,42.5,5h-13Z',
  attrs: {
    body: {
      fill: 'rgba(95,149,255,0.05)',
      stroke: '#5F95FF',
    },
  },
};
export default {
  roundedRectangle,
  rectangle,
  diamond,
  circle,
  ellipse,
  noRulepath,
  heart,
  fivePointedStar,
  lightning,
  forward,
  forwardDouble,
  panorama,
  pause,
};
