import React, { FC, memo, useEffect, useMemo } from 'react';
import useStyle from '@/core/attr/useStyle';
const Index: FC<templateDataType> = memo(function Index(props) {
  const { propValue } = props;
  const { resultStyle } = useStyle(props.propValue);
  const render = useMemo(() => {
    let template = null;
    switch (propValue.type) {
      case 'h1':
        template = <h1 style={resultStyle}>{propValue.textVal}</h1>;
        break;
      case 'h2':
        template = <h2 style={resultStyle}>{propValue.textVal}</h2>;
        break;
      case 'h3':
        template = <h3 style={resultStyle}>{propValue.textVal}</h3>;
        break;
      case 'h4':
        template = <h4 style={resultStyle}>{propValue.textVal}</h4>;
        break;
      case 'h5':
        template = <h5 style={resultStyle}>{propValue.textVal}</h5>;
        break;
      case 'h6':
        template = <h6 style={resultStyle}>{propValue.textVal}</h6>;
        break;

      default:
        template = <h2 style={resultStyle}>{propValue.textVal}</h2>;
        break;
    }
    return template;
  }, [propValue, resultStyle]);
  return <div style={{ width: '100%', height: '100%', ...resultStyle }}>{render}</div>;
});

export default Index;
