import { componentInitialStateType } from '@/redux/reduce/component';
import { contextMenuInitialStateType } from '@/redux/reduce/contextMenu';
import { markLineInitialStateType } from '@/redux/reduce/markLine';
import { markLineActionMerage } from '@/redux/action/markLine';
import { contextMenuActionMerage } from '@/redux/action/contextMenu';
import { componentActionMerage } from '@/redux/action/component';
import { Dispatch } from 'redux';
import { composeInitialStateType } from '@/redux/reduce/compose';
import { composeMenuActionMerage } from '@/redux/action/compose';
import { snapshotInitialStateType } from '@/redux/reduce/snapshot';
import { snapshotActionMerage } from '@/redux/action/snapshot';
import { copyInitialStateType } from '@/store/controller/editor/copy';
declare global {
  /* eslint-disable */
  interface FormType<T = string> {
    key: T;
    name: T;
    type: T;
    /**
     * @description 设置后置标签
     */
    addonAfter?: any;
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
    propValue?: K;
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
    compose: composeInitialStateType;
    snapshot: snapshotInitialStateType;
    copys: copyInitialStateType;
  }
  /**
   * @description 全局声明redux中的dispatch数据
   */
  type storeDisPatch = Dispatch<
    | markLineActionMerage
    | contextMenuActionMerage
    | componentActionMerage
    | composeMenuActionMerage
    | snapshotActionMerage
  >;
}
