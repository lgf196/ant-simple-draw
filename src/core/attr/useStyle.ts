import { useMemo } from 'react';
import { stringRgba } from '@/utils';
/**
 * @description 这个方法用来将对象，转为对应的css样式
 */
const useStyle = <T extends Object>(val: T) => {
  const resultStyle = useMemo(() => {
    let style = Object.create({});
    for (const key in val) {
      if (Object.prototype.hasOwnProperty.call(val, key)) {
        const item = val[key] as any;
        if (item) {
          switch (key) {
            case 'background':
              style.background = item.type === 'gradient' ? item.value : stringRgba(item.value);

              break;
            case 'color':
              style.color = item;
              break;
            case 'border':
              style.border = `${item.w}px ${item.s} ${item.c}`;
              break;
            default:
              style = { ...style };
              break;
          }
        }
      }
    }
    return style;
  }, [val]);

  return {
    resultStyle,
  };
};

export default useStyle;
