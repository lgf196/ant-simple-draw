import { defaultEditableEl } from '@/core/config/common';

export default {
  id: 'baseText01',
  category: 'base',
  type: 'Text',
  component: 'Text',
  label: '文本组件',
  propValue: {
    w: 200,
    h: 22,
    x: 0,
    y: 0,
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
  editableEl: [...defaultEditableEl()],
} as templateDataType;
