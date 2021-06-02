import { shapeName } from '@/config';
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
export default { roundedRectangle, rectangle, diamond, circle };
