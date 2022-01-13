import { useDispatch, useSelector } from 'react-redux';
import { recordSnapshot, redo, undo } from '@/store/controller/editor/snapshot';
import { copy, cut, paste } from '@/store/controller/editor/copy';
import { keyCodeType } from '../config/hotKey';
import { createSelector } from 'reselect';
import {
  addComponent,
  bottomComponentAction,
  deleteComponentAction,
  topComponentAction,
} from '@/store/controller/editor/component';
import decomposeComponent from '@/utils/decomposeComponent';
import { $ } from '@/utils';
const useEdit = () => {
  const [curComponent, componentDataList] = useSelector(
    createSelector(
      [(state: storeType) => state.component],
      ({ curComponent, componentDataList }) => [curComponent, componentDataList] as const,
    ),
  );

  const dispatch = useDispatch();

  const cutHandle = () => dispatch(cut());

  const copyHandle = () => dispatch(copy());

  const pasteHandle = (isContextMenuMouse: boolean = false) => [
    dispatch(paste(isContextMenuMouse)),
    dispatch(recordSnapshot()),
  ];

  const undoHandle = () => dispatch(undo());

  const redoHandle = () => dispatch(redo());

  const deleteHandle = (flag: string) => {
    if (!componentDataList.length) {
      return;
    }
    if (curComponent?.componentId && flag === 'one') {
      dispatch(deleteComponentAction([curComponent.componentId]));
    }
    if (flag === 'clearAll') {
      dispatch(deleteComponentAction(['clearAll']));
    }
    dispatch(recordSnapshot());
  };

  const layerTopHandle = () => dispatch(topComponentAction());

  const bottomLayerHandle = () => dispatch(bottomComponentAction());

  const editHandle = (key: keyCodeType, otherParameters?: { isContextMenuMouse: boolean }) => {
    let isContextMenuMouse = false;
    if (otherParameters) {
      isContextMenuMouse = otherParameters.isContextMenuMouse;
    }
    switch (key) {
      case 'Ctrl+X':
        cutHandle();
        break;
      case 'Ctrl+C':
        copyHandle();
        break;
      case 'Ctrl+V':
        pasteHandle(isContextMenuMouse);
        break;
      case 'Ctrl+Z':
        undoHandle();
        break;
      case 'Shift+Z':
        redoHandle();
        break;
      case 'Delete':
        deleteHandle('one');
        break;
      case 'Shift+A':
        deleteHandle('clearAll');
      case 'Ctrl+Shift+↑':
        layerTopHandle();
        break;
      case 'Ctrl+Shift+↓':
        bottomLayerHandle();
        break;
      default:
        break;
    }
  };

  /**
   * @description 取消组合合并的组件
   */
  const decompose = (GroupComponents: templateDataType, deleteMergeComponent: string[]) => {
    /* if (curComponent && curComponent.component === 'Group') {
      const parentStyle = { ...curComponent.style };
      const components: templateDataType[] = curComponent.groupComponents!;
      const editorRect = $('#editor').getBoundingClientRect();
      components.forEach((component) => {
        // 将组合中的各个子组件拆分出来，并计算它们新的 style
        const decomposeComponentStyle = decomposeComponent(component, editorRect, parentStyle);

        dispatch(addComponent(decomposeComponentStyle));
      });
      // 组合的子组件已近添加了，这个时候组合组件得删除，没用了
      dispatch(deleteComponentAction([curComponent.componentId!]));
      dispatch(recordSnapshot());
    } */

    const parentStyle = { ...GroupComponents.style };
    const components: templateDataType[] = GroupComponents.groupComponents!;
    const editorRect = $('#editor').getBoundingClientRect();
    components.forEach((component) => {
      // 将组合中的各个子组件拆分出来，并计算它们新的 style
      const decomposeComponentStyle = decomposeComponent(component, editorRect, parentStyle);

      dispatch(addComponent(decomposeComponentStyle));
    });
    // 组合的子组件已近添加了，这个时候组合组件得删除，没用了
    dispatch(deleteComponentAction(deleteMergeComponent));
    dispatch(recordSnapshot());
  };

  return {
    editHandle,
    cutHandle,
    copyHandle,
    pasteHandle,
    undoHandle,
    redoHandle,
    deleteHandle,
    layerTopHandle,
    bottomLayerHandle,
    decompose,
  };
};

export default useEdit;
