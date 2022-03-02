import { defaultProps } from '@/core/config/common';
export default {
  id: 'textRichText',
  category: 'text',
  type: 'RichText',
  component: 'RichText',
  label: '富文本',
  propValue: {
    ...defaultProps({ w: 100, h: 50 }),
    richTextValue: '我是富文本编辑器',
  },
  icon: 'https://cdn.gudsen.com/2021/09/30/af90bac80a9447f18156e251ecbc1dff.png',
  style: {
    width: 100,
    height: 50,
  },
  editableEl: [
    { key: 'richTextValue', name: '内容', type: 'RichText', title: '内容' },
    {
      title: '整体样式',
      type: 'Background',
      name: '背景色',
      key: 'background',
    },
    {
      type: 'Number',
      name: '字缩进',
      key: 'textIndent',
      col: 12,
    },

    {
      type: 'Number',
      name: '字间距',
      key: 'letterSpacing',
      col: 12,
    },
    {
      type: 'Padding',
      name: '内边距',
      key: 'padding',
    },
    {
      type: 'BorderRadius',
      name: '圆角',
      title: '高级样式',
      key: 'borderRadius',
    },

    {
      type: 'BoxShadow',
      name: '阴影',
      key: 'boxShadow',
    },
    {
      type: 'Border',
      name: '边框',
      key: 'border',
    },
    {
      type: 'Slider',
      name: '透明度',
      key: 'opacity',
    },
    {
      type: 'TextShadow',
      name: '投影',
      key: 'textShadow',
    },
  ],
} as templateDataType;
