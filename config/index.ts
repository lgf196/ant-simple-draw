/**
 * @author lgf
 * @description vite的配置文件
 */
// import { environmentVariable } from '../src/utils';
/**
 * @description 开发端口
 */
export const VITE_APP_PORT = 3001;
/**
 * @description 公共基础路径
 */
export const VITE_APP_BASE = '/';
/**
 * @description 是否自动在浏览器中打开应用程序
 */
export const VITE_APP_OPEN = true;
/**
 * @description 是否在开发模式下，启动eslint
 */
export const VITE_APP_ESLINT = true;
/**
 * @description 是否在打包环境下，开启打包的分析可视化图
 */
export const VITE_APP_VISUALIZER = false;
/**
 * @description 是否在打包环境下，去除console.log
 */
// export const VITE_APP_CONSOLE = environmentVariable() === 'dev' ? false : true;
export const VITE_APP_CONSOLE = true;
/**
 * @description 是否开启兼容模式-IE11
 */
export const VITE_APP_LEGACY = true;
/**
 * @description 打包环境下，删除debugger
 */
export const VITE_APP_DEBUGGER = true;
/**
 * @description 打包环境下是否生成source map 文件
 */
export const VITE_APP_SOURCEMAP = false;
