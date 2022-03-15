import { commonAttr, defaultProps, commonStyle } from '@/core/config/common';
export default {
  id: 'pictureImage',
  category: 'picture',
  type: 'Image',
  component: 'Image',
  label: '图片',
  propValue: {
    ...defaultProps({ w: 100, h: 50 }),
    textVal: '图片',
  },
  icon: 'https://cdn.gudsen.com/2021/09/30/af90bac80a9447f18156e251ecbc1dff.png',
  style: {
    width: 100,
    height: 50,
  },
  editableEl: [],
} as templateDataType;

/**
 *@param key 唯一值
 * @param url 图片地址
 * @param props 图片控件的属性
 */
export const ImageConfig = (
  key: string,
  url: string,
  props: Partial<mustExistProps & uncertainProps>,
): templateDataType => {
  const { w, h } = props;
  return {
    ...commonAttr,
    id: 'pictureImage' + key,
    category: 'picture',
    type: 'Image',
    component: 'Image',
    label: '图片',
    propValue: {
      ...defaultProps(),
      ...props,
    },
    icon: url,
    style: {
      ...commonStyle,
      width: w,
      height: h,
    },
    editableEl: [
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
        type: 'Slider',
        name: '透明度',
        key: 'opacity',
      },
    ],
  };
};
