import React, { memo } from 'react';

const Grid = memo(function Grid() {
  return (
    <>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="smallGrid"
            width="7.236328125"
            height="7.236328125"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 7.236328125 0 L 0 0 0 7.236328125"
              fill="none"
              stroke="rgba(207, 207, 207, 0.3)"
              strokeWidth="1"
            ></path>
          </pattern>
          <pattern
            id="grid"
            width="36.181640625"
            height="36.181640625"
            patternUnits="userSpaceOnUse"
          >
            <rect width="36.181640625" height="36.181640625" fill="url(#smallGrid)"></rect>
            <path
              d="M 36.181640625 0 L 0 0 0 36.181640625"
              fill="none"
              stroke="rgba(186, 186, 186, 0.5)"
              strokeWidth="1"
            ></path>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)"></rect>
      </svg>
    </>
  );
});

export default Grid;
