declare module 'macy' {
  interface macyProps {
    /**
     * @description 容器
     */
    container: string;
    margin?: number;
    /**
     * @description 要显示的列数
     */
    columns?: number;
    /**
     * @description 响应式布局
     */

    breakAt?: Record<number, number>;
  }
  export default class Macy {
    props: macyProps;
    constructor(props: macyProps);
    remove: () => void;
  }
}
