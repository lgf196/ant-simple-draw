import { defaultProps } from '@/core/config/common';
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
