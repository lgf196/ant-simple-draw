import { BuildOptions } from 'vite';
import { VITE_APP_CONSOLE, VITE_APP_DEBUGGER, VITE_APP_SOURCEMAP } from '../config';
const build: BuildOptions = {
  terserOptions: {
    compress: {
      keep_infinity: true,
      drop_console: VITE_APP_CONSOLE,
      drop_debugger: VITE_APP_DEBUGGER,
    },
  },
  outDir: 'dist', // 指定输出路径目录
  assetsDir: 'assets', // 指定打包生成静态资源的存放路径目录
  sourcemap: VITE_APP_SOURCEMAP, // 构建后是否生成 source map文件
};
export default build;
