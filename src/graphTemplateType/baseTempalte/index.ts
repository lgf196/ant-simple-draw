import { tempalteType } from '@/graphTemplateType';
import { shapeCategory } from '@/config';
const BasicTemplate: tempalteType[] = [
  { type: 'rectangle', title: 'rectangle', category: shapeCategory.base },
  { type: 'circle', title: 'circle', category: shapeCategory.base },
  {
    type: 'roundedRectangle',
    title: 'roundedRectangle',
    category: shapeCategory.base,
  },
  { type: 'diamond', title: 'diamond', category: shapeCategory.base },
  { type: 'ellipse', title: 'ellipse', category: shapeCategory.base },
];

export default BasicTemplate;
