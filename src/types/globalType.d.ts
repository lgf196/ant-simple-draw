import { copyInitialStateType } from '@/store/controller/editor/copy';
import { configInitialStateType } from '@/store/controller/config';
import { componentInitialStateType } from '@/store/controller/editor/component';
import { contextMenuInitialStateType } from '@/store/controller/editor/contextMenu';
import { markLineInitialStateType } from '@/store/controller/editor/markLine';
import { snapshotInitialStateType } from '@/store/controller/editor/snapshot';
declare global {
  /* eslint-disable */
  interface mustExistProps<T = number | string> {
    // 一定存在的属性
    w: T;
    h: T;
    x: T;
    y: T;
  }
  interface uncertainProps {
    [par: string]: any;
  }
  interface FormType<T = string> {
    /**
     * @description 表单的key值
     */
    key: T;
    /**
     * @description 表单的lable属性，名字
     */
    name: T;
    /**
     * @description 表单的类型，如，input，select等..
     */
    type: T;
    /**
     * @description 用来配置栅格布局的,最大24
     */
    col?: number;
    /**
     * @description 用来显示额外标题的
     */
    title?: string;
    /**
     * @description 用来设置宽度的
     */
    width?: string;
    /**
     * @description 是否显示边框
     */
    border?: boolean;
    [par: string]: any;
  }
  interface templateDateInterface<T = string, K = any> {
    /**
     * @description 类别
     */
    category: T;
    /**
     * @description 类别模块中的类型
     */
    type: T;
    /**
     * @description 组件id,用来区分组件的
     */
    id: T;
    /**
     * @description 组件
     */
    component: T;
    /**
     * @description 组件名称
     */
    label: T;
    /**
     * @description 组件样式
     */
    style: MergeCSSProperties;
    /**
     * @description 组件属性
     */
    propValue: mustExistProps & uncertainProps;
    /**
     * @description 组件icon/image
     */
    icon?: T;
    /**
     * @description 能够编辑属性类型的配置项，显示不同的form表单类型
     */
    editableEl: FormType[];
  }
  interface templateDataType extends templateDateInterface {
    /**
     * @description 动态生成的组件id，所有的操作基于这个id
     */
    componentId?: string;
    /**
     * @description 事件
     */
    events?: any;
    /**
     * @description 组合组件的样式
     */
    groupStyle?: MergeCSSProperties;
    /**
     * @description 组合组件
     */
    groupComponents?: any[];
    /**
     * @description 是否锁定组件
     */
    isLock?: boolean;
    [par: string]: any;
  }
  /**
   * @description 全局声明redux中的store数据
   */
  interface storeType {
    component: componentInitialStateType;
    contextMenu: contextMenuInitialStateType;
    markLine: markLineInitialStateType;
    compose: componentInitialStateType;
    snapshot: snapshotInitialStateType;
    copys: copyInitialStateType;
    config: configInitialStateType;
  }
}
