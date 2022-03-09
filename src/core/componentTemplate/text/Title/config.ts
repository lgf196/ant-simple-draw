import { defaultProps } from '@/core/config/common';
import { editableEl } from '@/core/componentTemplate/text/config';
export default {
  id: 'textTitle',
  category: 'text',
  type: 'Title',
  component: 'Title',
  label: '标题',
  propValue: {
    ...defaultProps({ w: 200, h: 22 }),
    textVal: '我是标题',
    fontSize: 14,
    type: 'h2',
  },
  icon: 'https://cdn.gudsen.com/2021/09/30/af90bac80a9447f18156e251ecbc1dff.png',
  style: {
    width: 200,
    height: 22,
  },
  editableEl: [
    { key: 'textVal', name: '内容', type: 'TextArea', title: '内容' },
    {
      key: 'type',
      name: '标题',
      type: 'Select',
      options: [
        { label: 'H1', value: 'h1' },
        { label: 'H2', value: 'h2' },
        { label: 'H3', value: 'h3' },
        { label: 'H4', value: 'h4' },
        { label: 'H5', value: 'h5' },
        { label: 'H6', value: 'h6' },
      ],
    },
    ...editableEl,
  ],
} as templateDataType;
