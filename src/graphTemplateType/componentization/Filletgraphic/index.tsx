import React, { memo, FC } from 'react';
import { ReactShape } from '@antv/x6-react-shape';
import style from './index.module.scss';
export interface reactNodeType {
  node?: ReactShape;
  text: string;
}

const Index: FC<reactNodeType> = memo(function Index({ node, text }) {
  console.log(`node`, node!.getData());
  return (
    <div className={style.reactNode}>
      <img
        src="http://blog.lgf196.top/ant-simple-pro-document/logon.png"
        alt=""
      />
      <p>{text}</p>
    </div>
  );
});

export default Index;
