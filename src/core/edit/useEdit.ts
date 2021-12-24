import { useDispatch } from 'react-redux';
import { redo, undo } from '@/store/controller/editor/snapshot';
import { copy, cut, paste } from '@/store/controller/editor/copy';
import { keyCodeType } from '../config/hotKey';

const useEdit = () => {
  const dispatch = useDispatch();

  const cutHandle = () => dispatch(cut());

  const copyHandle = () => dispatch(copy());

  const pasteHandle = (isContextMenuMouse: boolean = false) => dispatch(paste(isContextMenuMouse));

  const undoHandle = () => dispatch(undo());

  const redoHandle = () => dispatch(redo());

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
        break;
      case 'Shift+A':
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
  };
};

export default useEdit;
