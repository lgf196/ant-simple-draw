/**
 * @description 添加组件
 */
export const addComponent = 'addComponent';
export type addComponent = typeof addComponent;
/**
 * @description 删除组件
 */
export const deleteComponent = 'deleteComponent';
export type deleteComponent = typeof deleteComponent;
/**
 * @description 当前选中的组件
 */
export const curComponent = 'curComponent';
export type curComponent = typeof curComponent;
/**
 * @description 判断当前组件是否选中
 */
export const isClickComponent = 'isClickComponent';
export type isClickComponent = typeof isClickComponent;
/**
 * @description 修改选中的组件样式
 */
export const setShapeStyle = 'setShapeStyle';
export type setShapeStyle = typeof setShapeStyle;
/**
 * @description 对齐线改变的时候，修改当前组件
 */
export const setShapeSingleStyle = 'setShapeSingleStyle';
export type setShapeSingleStyle = typeof setShapeSingleStyle;
/**
 * @description 显示右键菜单
 */
export const showContextMenu = 'showContextMenu';
export type showContextMenu = typeof showContextMenu;
/**
 * @description 隐藏右键菜单
 */
export const hideContextMenu = 'hideContextMenu';
export type hideContextMenu = typeof hideContextMenu;
/**
 * @description 显示对齐线
 */
export const showMarkLine = 'showMarkLine';
export type showMarkLine = typeof showMarkLine;
/**
 * @description 隐藏对齐线
 */
export const hidewMarkLine = 'hidewMarkLine';
export type hidewMarkLine = typeof hidewMarkLine;
/**
 * @description 设置组合合并器
 */
export const setAreaData = 'setAreaData';
export type setAreaData = typeof setAreaData;
/**
 * @description 组件组合合并
 */
export const areacompose = 'areacompose';
export type areacompose = typeof areacompose;
/**
 * @description 前进，后退快照索引
 */
export const snapshotIndex = 'snapshotIndex';
export type snapshotIndex = typeof snapshotIndex;
/**
 * @description 前进，后退存储编辑器快照数据
 */
export const snapshotData = 'snapshotData';
export type snapshotData = typeof snapshotData;
/**
 * @description 撤销
 */
export const undo = 'undo';
export type undo = typeof undo;
/**
 * @description 重做
 */
export const redo = 'redo';
export type redo = typeof redo;
/**
 * @description 添加快照，也就是缓存区
 */
export const recordSnapshot = 'recordSnapshot';
export type recordSnapshot = typeof recordSnapshot;
