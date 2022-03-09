import { useMemo } from 'react';
import { stringRgba } from '@/utils';
import { BackfgroundValType } from './index';
const useBackground = (bgVal: BackfgroundValType) => {
  const backgroundStyle = useMemo(() => {
    if (!bgVal.value) {
      return undefined;
    } else {
      return { background: bgVal.type === 'gradient' ? bgVal.value : stringRgba(bgVal.value) };
    }
  }, [bgVal]);
  return {
    backgroundStyle,
  };
};

export default useBackground;
