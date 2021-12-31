import { $ } from './index';
import { mod360 } from './translate';
import produce from 'immer';
/**
@description 将组合中的各个子组件拆分出来，并计算它们新的 style
 */
export default function decomposeComponent(
  component: templateDataType,
  editorRect: DOMRect,
  parentStyle: MergeCSSProperties,
) {
  return produce(component, (draftState) => {
    if (!$(`#components_${draftState.componentId}`)) {
      return;
    }
    const componentRect = $(`#components_${draftState.componentId}`).getBoundingClientRect();
    // 获取元素的中心点坐标
    const center = {
      x: componentRect.left - editorRect.left + componentRect.width / 2,
      y: componentRect.top - editorRect.top + componentRect.height / 2,
    };

    draftState.style.rotate = mod360(draftState.style.rotate + parentStyle.rotate);
    draftState.style.width = (parseFloat(draftState.groupStyle!.width) / 100) * parentStyle.width;
    draftState.style.height =
      (parseFloat(draftState.groupStyle!.height) / 100) * parentStyle.height;
    // 计算出元素新的 top left 坐标
    draftState.style.left = center.x - draftState.style.width / 2;
    draftState.style.top = center.y - draftState.style.height / 2;
    draftState.groupStyle = {};
  });
}
