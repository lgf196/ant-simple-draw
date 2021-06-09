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
  { type: 'noRulepath', title: 'noRulepath', category: shapeCategory.base },
  { type: 'heart', title: 'heart', category: shapeCategory.base },
  {
    type: 'fivePointedStar',
    title: 'fivePointedStar',
    category: shapeCategory.base,
  },
  { type: 'lightning', title: 'lightning', category: shapeCategory.base },
  { type: 'forward', title: 'forward', category: shapeCategory.base },
  {
    type: 'forwardDouble',
    title: 'forwardDouble',
    category: shapeCategory.base,
  },
  { type: 'panorama', title: 'panorama', category: shapeCategory.base },
  { type: 'pause', title: 'pause', category: shapeCategory.base },
];

export default BasicTemplate;
