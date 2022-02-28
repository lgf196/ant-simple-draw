import { defaultProps } from '@/core/config/common';
import { editableEl } from '@/core/componentTemplate/text/config';
export default {
  id: 'textRichText',
  category: 'text',
  type: 'RichText',
  component: 'RichText',
  label: '富文本',
  propValue: {
    ...defaultProps({ w: 100, h: 50 }),
  },
  icon: 'https://cdn.gudsen.com/2021/09/30/af90bac80a9447f18156e251ecbc1dff.png',
  style: {
    width: 100,
    height: 50,
  },
  editableEl: [
    { key: 'textVal', name: '内容', type: 'RichText', title: '内容' },
    {
      type: 'Padding',
      name: '内边距',
      key: 'padding',
    },
  ],
} as templateDataType;
