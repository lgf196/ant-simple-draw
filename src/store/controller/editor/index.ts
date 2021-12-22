import { getModuleData } from '@/core/config/common';
import component from './component';
import contextMenu from './contextMenu';
import copys from './copy';
import markLine from './markLine';
import snapshot from './snapshot';

const editorModuleReducer = async () => {
  let res = await getModuleData(import.meta.glob('./*.ts'));
  for (let index = 0; index < res.length; index++) {
    const item = res[index];
  }
  return res;
};

export default {
  component,
  contextMenu,
  copys,
  markLine,
  snapshot,
};
