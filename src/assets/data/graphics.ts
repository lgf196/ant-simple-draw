import { graphicsConfigItem } from '@/core/componentTemplate/graphics/Carrier/config';
/**
 * @description 通用图形
 */
export const universal = [
  graphicsConfigItem(
    'universal_square',
    '正方形',
    {
      category: 'universal',
      name: 'square',
    },
    { w: 70, h: 70 },
  ),
  graphicsConfigItem(
    'universal_diamond',
    '菱形',
    {
      category: 'universal',
      name: 'diamond',
    },
    { w: 70, h: 70 },
  ),
  graphicsConfigItem(
    'universal_quadrilateral',
    '四边形',
    {
      category: 'universal',
      name: 'quadrilateral',
    },
    { w: 70, h: 70 },
  ),
  graphicsConfigItem(
    'universal_circle',
    '圆形',
    {
      category: 'universal',
      name: 'circle',
    },
    { w: 70, h: 70 },
  ),
  graphicsConfigItem(
    'universal_rectangle',
    '长方形',
    {
      category: 'universal',
      name: 'rectangle',
    },
    { w: 70, h: 70 },
  ),
  graphicsConfigItem(
    'universal_ellipse',
    '椭圆形',
    {
      category: 'universal',
      name: 'ellipse',
    },
    { w: 70, h: 70 },
  ),
  graphicsConfigItem(
    'universal_hexagon',
    '六边形',
    {
      category: 'universal',
      name: 'hexagon',
    },
    { w: 70, h: 70 },
  ),
  graphicsConfigItem(
    'universal_heptagon',
    '七边形',
    {
      category: 'universal',
      name: 'heptagon',
    },
    { w: 70, h: 70 },
  ),
  graphicsConfigItem(
    'universal_octagon',
    '八角形',
    {
      category: 'universal',
      name: 'octagon',
    },
    { w: 70, h: 70 },
  ),
  graphicsConfigItem(
    'universal_pentagon',
    '五角形',
    {
      category: 'universal',
      name: 'pentagon',
    },
    { w: 70, h: 70 },
  ),
  graphicsConfigItem(
    'universal_trapezoid',
    '梯形',
    {
      category: 'universal',
      name: 'trapezoid',
    },
    { w: 70, h: 70 },
  ),
  graphicsConfigItem(
    'universal_triangle',
    '三角形',
    {
      category: 'universal',
      name: 'triangle',
    },
    { w: 70, h: 70 },
  ),
  graphicsConfigItem(
    'universal_cylinder',
    '圆柱',
    {
      category: 'universal',
      name: 'cylinder',
    },
    { w: 70, h: 70 },
  ),
  graphicsConfigItem(
    'universal_prism',
    '棱柱',
    {
      category: 'universal',
      name: 'prism',
    },
    { w: 70, h: 70 },
  ),
  graphicsConfigItem(
    'universal_cube',
    '立方体',
    {
      category: 'universal',
      name: 'cube',
    },
    { w: 70, h: 70 },
  ),
  graphicsConfigItem(
    'universal_pyramid',
    '锥形',
    {
      category: 'universal',
      name: 'pyramid',
    },
    { w: 70, h: 70 },
  ),
  graphicsConfigItem(
    'universal_up-arrow',
    '箭头',
    {
      category: 'universal',
      name: 'up-arrow',
    },
    { w: 70, h: 70 },
  ),
];

/**
 * @description 箭头图形
 */
export const arrow = [
  graphicsConfigItem(
    'arrow_down',
    '下箭头',
    {
      category: 'arrow',
      name: 'down',
    },
    { w: 70, h: 70 },
  ),
  graphicsConfigItem(
    'arrow_Ld',
    '左下箭头',
    {
      category: 'arrow',
      name: 'Ld',
    },
    { w: 70, h: 70 },
  ),
  graphicsConfigItem(
    'arrow_Left',
    '左箭头',
    {
      category: 'arrow',
      name: 'Left',
    },
    { w: 70, h: 70 },
  ),
  graphicsConfigItem(
    'arrow_Lu',
    '左上箭头',
    {
      category: 'arrow',
      name: 'Lu',
    },
    { w: 70, h: 70 },
  ),
  graphicsConfigItem(
    'arrow_Right',
    '右箭头',
    {
      category: 'arrow',
      name: 'Right',
    },
    { w: 70, h: 70 },
  ),
  graphicsConfigItem(
    'arrow_Rd',
    '右下箭头',
    {
      category: 'arrow',
      name: 'Rd',
    },
    { w: 70, h: 70 },
  ),
  graphicsConfigItem(
    'arrow_Ru',
    '右上箭头',
    {
      category: 'arrow',
      name: 'Ru',
    },
    { w: 70, h: 70 },
  ),
  graphicsConfigItem(
    'arrow_Up',
    '上箭头',
    {
      category: 'arrow',
      name: 'Up',
    },
    { w: 70, h: 70 },
  ),
];
export default [
  {
    category: 'graphics',
    title: '通用',
    componentList: universal,
  },
  {
    category: 'graphics',
    title: '箭头',
    componentList: arrow,
  },
];
