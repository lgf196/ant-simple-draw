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
    // 解除组合的时候，style的w,h,x,y要和propValue一样，不一样的话，在编辑的时候，会出现值不一样的情况
    draftState.propValue.w = parseInt(draftState.style.width);
    draftState.propValue.h = parseInt(draftState.style.height);
    draftState.propValue.x = parseInt(draftState.style.left);
    draftState.propValue.y = parseInt(draftState.style.top);
    draftState.groupStyle = {};
  });
}
