import { commonStyle, commonAttr } from '@/core/config/common';

/* eslint-disable */
const list: templateDataType[] = [
  {
    id: 'baseText01',
    category: 'base',
    type: 'Text',
    component: 'Text',
    label: '文本组件',
    propValue: '双击编辑文字',
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
  },
  {
    id: 'baseButton02',
    category: 'base',
    type: 'Button',
    component: 'Button',
    label: '按钮组件',
    propValue: '按钮',
    icon: 'https://cdn.gudsen.com/2021/09/30/af90bac80a9447f18156e251ecbc1dff.png',
  },
];

for (let i = 0, len = list.length; i < len; i++) {
  const item = list[i];
  item.style = { ...commonStyle, ...item.style };
  list[i] = { ...commonAttr, ...item };
}

export default list;
