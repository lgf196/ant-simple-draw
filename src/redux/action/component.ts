import * as types from '@/redux/constants/actionType';

export const addComponent = (data: templateDataType[]) => ({ type: types.addComponent, data });

/**
 * @description 合并component模块的action
 */
export type componentActionMerage = dispatchType<types.addComponent, templateDataType[]>;
