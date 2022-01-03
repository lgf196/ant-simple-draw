import { setShapeStyleAction } from '@/store/controller/editor/component';
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import CustomizeInput from './CustomizeInput';
import style from '../index.module.scss';
const WhXy = memo(function WhXy(props) {
  const dispatch = useDispatch();
  const [curComponent] = useSelector(
    createSelector([(state: storeType) => state.component], (component) => {
      return [component.curComponent] as const;
    }),
  );
  const handle = (e: string | number, flag: string) => {
    switch (flag) {
      case 'w':
        dispatch(setShapeStyleAction({ width: e }));
        break;
      case 'h':
        dispatch(setShapeStyleAction({ height: e }));
        break;
      case 'x':
        dispatch(setShapeStyleAction({ left: e }));
        break;
      case 'y':
        dispatch(setShapeStyleAction({ top: e }));
        break;
      default:
        break;
    }
  };
  return (
    <div className={style.whxy}>
      <div className={style.item}>
        <CustomizeInput
          attr={curComponent?.propValue.w}
          title="w"
          callBack={(e) => handle(e, 'w')}
        />
        <CustomizeInput
          attr={curComponent?.propValue.h}
          title="h"
          callBack={(e) => handle(e, 'h')}
        />
      </div>
      <div className={style.item}>
        <CustomizeInput
          attr={curComponent?.propValue.x}
          title="x"
          callBack={(e) => handle(e, 'x')}
        />
        <CustomizeInput
          attr={curComponent?.propValue.y}
          title="y"
          callBack={(e) => handle(e, 'y')}
        />
      </div>
    </div>
  );
});

export default WhXy;
