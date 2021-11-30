import * as types from '@/redux/constants/actionType';
import { showContextMenuDataType } from '../reduce/contextMenu';

/**
 * @description 合并ContextMenu模块的action
 */
export type contextMenuActionMerage =
  | dispatchType<types.showContextMenu, showContextMenuDataType>
  | dispatchType<types.hideContextMenu>;

export const showContextMenuAction = (data: showContextMenuDataType): contextMenuActionMerage => ({
  type: types.showContextMenu,
  data,
});

export const hideContextMenuAction = (): contextMenuActionMerage => ({
  type: types.hideContextMenu,
});
