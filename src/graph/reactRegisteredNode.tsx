/**
 *自定义react节点
 */
import React from 'react';
import { Graph } from '@antv/x6';
import '@antv/x6-react-shape';
import Filletgraphic from '@/graphTemplateType/componentization/Filletgraphic';
export const ReactNode = Graph.registerReactComponent(
  'Filletgraphic',
  <Filletgraphic text="ant-simple-pro" />,
);
