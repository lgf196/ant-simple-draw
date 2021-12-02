import React, { memo, useRef, useEffect } from 'react';

const MarkLine = memo(function MarkLine(props) {
  const eleRefList = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    console.log(`eleRefList.cu`, eleRefList.current);
  }, []);
  return (
    <div>
      {[11, 22, 33, 44, 1133].map((item, index) => (
        <div ref={(ref: HTMLDivElement) => eleRefList.current!.push(ref)} key={index}>
          {item}
        </div>
      ))}
    </div>
  );
});

export default MarkLine;
