import { commonStyle, commonAttr } from '@/core/config/common';

const list: templateDataType[] = [
  {
    category: 'base',
    type: 'Text',
    component: 'Text',
    label: '文字',
    propValue: '双击编辑文字',
    icon: 'wenben',
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
    category: 'base',
    type: 'Button',
    component: 'Button',
    label: '按钮',
    propValue: '按钮',
    icon: 'button',
  },
];

for (let i = 0, len = list.length; i < len; i++) {
  const item = list[i];
  item.style = { ...commonStyle, ...item.style };
  list[i] = { ...commonAttr, ...item };
}

export default list;
