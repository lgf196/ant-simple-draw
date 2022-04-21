import { commonAttr, defaultProps, commonStyle } from '@/core/config/common';
/**
 *
 @param key 唯一值
 @param name 名称
 @param svg svg的一些相关的信息
 @param props 控件的属性
 */
export const graphicsConfigItem = (
  key: string,
  name: string,
  svg: svgInfoType,
  props: Partial<mustExistProps & uncertainProps>,
): templateDataType => {
  const { w, h } = props;
  return {
    ...commonAttr,
    id: 'graphics_carrier_' + key,
    category: 'graphics',
    type: 'Carrier',
    component: 'Carrier',
    label: name,
    propValue: {
      ...defaultProps(),
      fontSize: 13,
      position: 'center',
      ...props,
    },
    icon: 'https://cdn.gudsen.com/2021/09/30/af90bac80a9447f18156e251ecbc1dff.png',
    svg,
    style: {
      ...commonStyle,
      width: w,
      height: h,
    },
    editableEl: [
      {
        title: '图形',
        type: 'Color',
        name: '填充色',
        key: 'fillColor',
      },
      {
        title: '文本',
        type: 'Input',
        name: '内容',
        key: 'text',
      },
      {
        key: 'position',
        name: '位置',
        type: 'Radio',
        options: [
          { label: '上', value: 'top' },
          { label: '居中', value: 'center' },
          { label: '下', value: 'bottom' },
        ],
      },
      {
        type: 'Color',
        name: '颜色',
        key: 'color',
      },
      {
        type: 'Number',
        name: '字号',
        key: 'fontSize',
        col: 12,
      },
      {
        type: 'Number',
        name: '字间距',
        key: 'letterSpacing',
        col: 12,
      },
    ],
  };
};
