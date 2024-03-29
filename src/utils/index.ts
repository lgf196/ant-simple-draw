/**
 * @description node运行环境
 * @return "dev" | "alpha" | "preprod" | "prod"
 */
import { CSSProperties } from 'react';
import { RgbaColor } from 'react-colorful';
export const environmentVariable = () => {
  const env = import.meta.env.VITE_APP_ANT;
  let parps = null;
  switch (env) {
    case 'dev': // 开发环境下
      parps = 'dev';
      break;
    case 'alpha': // 测试环境下
      parps = 'alpha';
      break;
    case 'preprod': // 预发布环境下
      parps = 'preprod';
      break;
    case 'prod': // 正式生产环境下
      parps = 'prod';
      break;
    default:
      parps = 'dev';
      break;
  }
  return parps;
};

/**
 * @description 深拷贝
 */
export const deepCopy = (obj: dynamicTyping) => {
  if (typeof obj !== 'object') return;
  const newObj: dynamicTyping = obj instanceof Array ? [] : {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
    }
  }
  return newObj;
};

/**
 * @description 取出某个数组对象的某个值
 * @param data 要处理的数组对象
 * @param quiteKey 判断属性值key
 * @param quiteVal 要做对比的值
 */
export const getSingleArrayVal = <T = unknown>(data: T[], quiteKey: keyof T, quiteVal: unknown) => {
  return data.length ? data.filter((item) => item[quiteKey] === quiteVal)[0] : [];
};

/**
 * @description 生成随机26位字符串id唯一值
 * @return {String} 字符串
 */
export const getRandomStr = (): string => {
  return new Date().getTime() + Math.random().toString(16).slice(2);
};
/**
 * @description 获取dom元素
 */
export const $ = (selector: string) => {
  return document.querySelector<HTMLDivElement>(selector)!;
};

export const stringRgba = (rgba: RgbaColor) => {
  return `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`;
};

/**
 * @description 获取全局css变量
 * @param property css全局变量属性名
 */
export const getCssProperty = (property: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(property);
};

/**
 * @description 修改全局css变量
 * @param property css全局变量属性名
 * @param value 要修改的属性值
 */
export const setCssProperty = (property: string, value: string) => {
  return document.documentElement.style.setProperty(property, value);
};

/**
 * @description 动态创建dom
 * @param tagName 创建的标签
 * @param tagValue 创建的标签的文本值
 * @param insertNode 创建标签插入的节点位置
 */
export interface createElementProps {
  tagName: string;
  tagValue: string;
  style?: CSSProperties;
  className?: string;
  class?: string;
}
export const createElements = (createNode: createElementProps, insertNode: string) => {
  const { tagName, tagValue, style, className } = createNode;
  const createEle = document.createElement(tagName);
  const createEleTextNode = document.createTextNode(tagValue);
  if (style) {
    for (const key in style) {
      if (Object.prototype.hasOwnProperty.call(style, key)) {
        const item = style[key as keyof typeof style];
        (createEle.style as dynamicTyping)[key] = item;
      }
    }
  }
  className && createEle.setAttribute('className', className);
  createEle.appendChild(createEleTextNode);
  $(insertNode).appendChild(createEle);
};
