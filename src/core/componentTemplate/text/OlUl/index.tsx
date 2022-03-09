import React, { memo, FC, useEffect, useMemo } from 'react';
import useStyle from '@/core/attr/useStyle';
import { useSetState } from '@/hooks';
export interface OlUlType {
  attrType: '1' | 'a' | 'A' | 'i' | 'I';
  list: Array<{ text: string }>;
  type: 'ul' | 'ol';
}
const Index: FC<templateDataType> = memo(function Index(props) {
  const { propValue, editableEl } = props;
  const { resultStyle } = useStyle(props.propValue);
  const [val, setVal] = useSetState<OlUlType>();
  useEffect(() => {
    const keyName = editableEl.filter((item) => item.type === 'OlUl')[0].key;
    if (propValue[keyName]) {
      setVal(propValue[keyName]);
    }
  }, [propValue]);

  const render = useMemo(() => {
    const li = (data: OlUlType['list']) =>
      data.map((item, index) =>
        data.length ? <li key={index}>{item && item.text ? item.text : ''}</li> : null,
      );
    return val.type === 'ul' ? (
      <ul style={{ listStyle: val.attrType }}>{li(val.list || [])}</ul>
    ) : (
      <ol type={val.attrType}>{li(val.list || [])}</ol>
    );
  }, [val]);

  return (
    <div style={{ width: '100%', height: '100%', ...resultStyle }} id="OlUl">
      {render}
    </div>
  );
});

export default Index;
