import { useDispatch, useSelector } from 'react-redux';
import { recordSnapshot, redo, undo } from '@/store/controller/editor/snapshot';
import { copy, cut, paste } from '@/store/controller/editor/copy';
import { keyCodeType } from '../config/hotKey';
import { createSelector } from 'reselect';
import { deleteComponentAction } from '@/store/controller/editor/component';
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
        break;
      default:
        break;
    }
  };
  return {
    editHandle,
    cutHandle,
    copyHandle,
    pasteHandle,
    undoHandle,
    redoHandle,
    deleteHandle,
  };
};

export default useEdit;
