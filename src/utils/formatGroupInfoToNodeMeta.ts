import baseGraphNodeList from '@/graph/base';
import combinationGraphNodeList from '@/graph/combination';
import componentizationGraphNodeList from '@/graph/componentization';
import { tempalteType } from '@/graphTemplateType';

export const filterNode = <T extends object>(
  reviceData: T = {} as T,
  type: string,
) => {
  const nodeKeyList = Object.keys(reviceData);
  const getCurrentNodeKey = nodeKeyList.filter((item) => item === type)[0];
  return (reviceData as any)[getCurrentNodeKey];
};

export const formatGroupInfoToNodeMeta = <T = tempalteType>(
  dropItem: T,
  point: { x: number; y: number },
) => {
  const { category, type } = dropItem as unknown as tempalteType;
  const { x, y } = point;
  let createNode = { x, y, data: dropItem };
  switch (category) {
    case 'base':
      createNode = Object.assign(
        {},
        createNode,
        filterNode(baseGraphNodeList, type),
      );
      break;
    case 'combination':
      createNode = Object.assign(
        {},
        createNode,
        filterNode(combinationGraphNodeList, type),
      );
      break;
    case 'componentization':
      createNode = Object.assign(
        {},
        createNode,
        filterNode(componentizationGraphNodeList, type),
      );
      break;
    default:
      break;
  }
  return createNode;
};
