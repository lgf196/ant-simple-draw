import { useState } from 'react';

const useGridAttr = () => {
  const [gridAttrs, setGridAttrs] = useState({
    type: 'fixedDot',
    size: 10,
    color: '#1492FF',
    thickness: 1,
    colorSecond: '#d0d0d0',
    thicknessSecond: 1,
    factor: 4,
    bgColor: '#fff',
    showImage: true,
    repeat: 'watermark',
    angle: 30,
    position: 'center',
    bgSize: JSON.stringify({ width: 150, height: 150 }),
    opacity: 0.1,
  });
  const setGridAttr = (key: string, value: any) => {
    setGridAttrs((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  return {
    gridAttrs,
    setGridAttr,
  };
};
export default useGridAttr;
