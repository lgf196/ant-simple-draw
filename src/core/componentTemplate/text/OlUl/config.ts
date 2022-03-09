import { defaultProps } from '@/core/config/common';
import { editableEl } from '@/core/componentTemplate/text/config';
export default {
  id: 'textOlUl',
  category: 'text',
  type: 'OlUl',
  component: 'OlUl',
  label: '列表',
  propValue: {
    ...defaultProps({ w: 100, h: 50 }),
    fontSize: 14,
    textVal: {
      attrType: '1',
      list: [{ text: '今天的天气真好呀' }],
      type: 'ol',
    },
  },
  icon: 'https://cdn.gudsen.com/2021/09/30/af90bac80a9447f18156e251ecbc1dff.png',
  style: {
    width: 100,
    height: 50,
  },
  editableEl: [{ key: 'textVal', name: '内容', type: 'OlUl', title: '内容' }, ...editableEl],
} as templateDataType;
