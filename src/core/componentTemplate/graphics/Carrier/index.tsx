import React, { memo, useMemo, FC } from 'react';
const Index: FC<templateDataType> = memo(function Index(props) {
  const { propValue, svg } = props;
  const symbolId = useMemo(() => '#icon-graphics-' + `${svg?.category}-${svg?.name}`, [svg]);
  return (
    <>
      <svg aria-hidden="true" width={propValue.w} height={propValue.h}>
        <use xlinkHref={symbolId} />
      </svg>
    </>
  );
});

export default Index;
