import React, { memo, FC } from 'react';
import useStyle from '@/core/attr/useStyle';
import Component from '../Text/Component';
import { useRouter } from '@/hooks';
const Index: FC<templateDataType> = memo(function Index(props) {
  const { query } = useRouter() as { query: any };
  const { propValue } = props;
  const { resultStyle } = useStyle(props.propValue);
  return (
    <div style={{ width: '100%', height: '100%', ...resultStyle }}>
      <Component
        name={propValue.textVal}
        model={query.model ? query.model : 'editor'}
        style={{ color: resultStyle.color }}
        href={propValue.href}
        target={propValue.target}
      />
    </div>
  );
});

export default Index;
