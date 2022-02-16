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
        if (typeof item !== 'undefined') {
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
            case 'opacity':
              style.opacity = item > 0 ? item / 100 : 0;
              break;
            case 'fontSize':
              style.fontSize = `${item}px`;
              break;
            case 'fontStyles': // 组合样式的处理
              for (const key in item) {
                if (Object.prototype.hasOwnProperty.call(item, key)) {
                  const element = item[key];
                  if (element) {
                    style[key] = element;
                  }
                }
              }
              break;
            case 'padding':
              for (const key in item) {
                if (Object.prototype.hasOwnProperty.call(item, key)) {
                  const element = item[key];
                  if (element) {
                    if (key === 't') {
                      style.paddingTop = element + 'px';
                    }
                    if (key === 'r') {
                      style.paddingRight = element + 'px';
                    }
                    if (key === 'b') {
                      style.paddingBottom = element + 'px';
                    }
                    if (key === 'l') {
                      style.paddingLeft = element + 'px';
                    }
                  }
                }
              }
              break;
            case 'letterSpacing':
              style.letterSpacing = `${item || 0}px`;
              break;
            case 'textIndent':
              style.textIndent = `${item || 0}px`;
              break;
            case 'lineHeight':
              style.lineHeight = item ? `${item}px` : 'normal';
              break;
            case 'borderRadius':
              for (const key in item) {
                if (Object.prototype.hasOwnProperty.call(item, key)) {
                  const element = item[key];
                  if (element) {
                    if (key === 'lt') {
                      style.borderTopLeftRadius = element + '%';
                    }
                    if (key === 'lb') {
                      style.borderBottomLeftRadius = element + '%';
                    }
                    if (key === 'rt') {
                      style.borderTopRightRadius = element + '%';
                    }
                    if (key === 'rb') {
                      style.borderBottomRightRadius = element + '%';
                    }
                  }
                }
              }
              break;
            case 'textShadow':
              style.textShadow = `${item.h / 10}px ${item.v / 10}px ${item.s / 20}px ${item.c}`;
              break;
            case 'boxShadow':
              style.boxShadow = `${item.h / 5}px ${item.v / 5}px ${item.bs / 2}px ${
                item.ss / 5
              }px ${item.c}`;
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
