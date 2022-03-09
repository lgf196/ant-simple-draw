import { defaultProps } from '@/core/config/common';
import { editableEl } from '@/core/componentTemplate/text/config';
export default {
  id: 'textLink',
  category: 'text',
  type: 'Link',
  component: 'Link',
  label: '链接',
  propValue: {
    ...defaultProps({ w: 100, h: 50 }),
    textVal: '我是一个链接',
    fontSize: 14,
    color: '#2254f4',
    target: '_blank',
  },
  icon: 'https://cdn.gudsen.com/2021/09/30/af90bac80a9447f18156e251ecbc1dff.png',
  style: {
    width: 100,
    height: 50,
  },
  editableEl: [
    { key: 'textVal', name: '内容', type: 'TextArea', title: '内容' },
    { key: 'href', name: '跳转地址', type: 'Input' },
    {
      key: 'target',
      name: '打开方式',
      type: 'Radio',
      options: [
        { label: '当前页面打开', value: '_self' },
        { label: '新标签页打开', value: '_blank' },
      ],
    },
    ...editableEl,
  ],
} as templateDataType;
