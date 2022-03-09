/**
 * @description text模块有些相同的类型配置编辑部分
 */
export const editableEl: FormType[] = [
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
    type: 'FontStyle',
    name: '样式',
    title: '文字选项',
    key: 'fontStyles',
  },
  {
    type: 'Number',
    name: '字号',
    key: 'fontSize',
    col: 12,
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
    type: 'Number',
    name: '行高',
    key: 'lineHeight',
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
];
