import React, { useState, useEffect, useRef, useCallback } from 'react';

// import styles from './index.module.scss';

export interface ScaleplateSize {
  width: number;
  height: number;
}
export type ScaleplateTypes = {
  direction: 'up' | 'left' | 'right' | 'bottom';
  ratio: number;
  id: string;
};

const Scaleplate: React.FC<ScaleplateTypes> = props => {
  return (
    <div>
      
    </div>
  )
}

export default React.memo(Scaleplate)