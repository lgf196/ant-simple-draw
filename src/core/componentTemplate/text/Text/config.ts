import { defaultProps } from '@/core/config/common';
import { editableEl } from '@/core/componentTemplate/text/config';
export default {
  id: 'textText',
  category: 'text',
  type: 'Text',
  component: 'Text',
  label: '文本',
  propValue: {
    ...defaultProps({ w: 200, h: 22 }),
    textVal: '文本',
    fontSize: 14,
  },
  icon: 'https://cdn.gudsen.com/2021/09/30/af90bac80a9447f18156e251ecbc1dff.png',
  style: {
    width: 200,
    height: 22,
  },
  editableEl: [{ key: 'textVal', name: '内容', type: 'TextArea', title: '内容' }, ...editableEl],
} as templateDataType;
