/**
 * @description node运行环境
 * @return "dev" | "alpha" | "preprod" | "prod"
 */
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
