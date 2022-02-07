import { defaultProps } from '@/core/config/common';

export default {
  id: 'textText01',
  category: 'text',
  type: 'Text',
  component: 'Text',
  label: '文本组件',
  propValue: {
    ...defaultProps({ w: 200, h: 22 }),
    textVal: '文本',
  },
  icon: 'https://cdn.gudsen.com/2021/09/30/af90bac80a9447f18156e251ecbc1dff.png',
  style: {
    width: 200,
    height: 22,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '',
    letterSpacing: 0,
    color: '',
  },
  editableEl: [
    { key: 'textVal', name: '内容', type: 'TextArea' },
    {
      title: '样式',
      type: 'Color',
      name: '颜色',
      key: 'color',
    },
    {
      type: 'Background',
      name: '背景色',
      key: 'background',
    },
    {
      type: 'Border',
      name: '边框',
      key: 'border',
    },
  ],
} as templateDataType;
