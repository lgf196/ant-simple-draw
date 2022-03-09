import React, { memo, FC, useEffect, useMemo } from 'react';
import useStyle from '@/core/attr/useStyle';
import { useSetState } from '@/hooks';
import { Checkbox } from 'antd';
export interface TaskListype {
  list: Array<{ text: string; check: boolean }>;
}
const Index: FC<templateDataType> = memo(function Index(props) {
  const { propValue, editableEl } = props;
  const { resultStyle } = useStyle(props.propValue);
  const [val, setVal] = useSetState<TaskListype>();
  useEffect(() => {
    const keyName = editableEl.filter((item) => item.type === 'TaskList')[0].key;
    if (propValue[keyName]) {
      setVal(propValue[keyName]);
    }
  }, [propValue]);

  const render = useMemo(() => {
    return val.list && val.list.length
      ? val.list.map((item, index) =>
          item ? (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox checked={item.check ? item.check : false} disabled />
              <p
                style={{
                  padding: '0 8px',
                  textDecoration: item.check ? 'line-through' : 'none',
                  margin: '0',
                }}
              >
                {item.text ? item.text : null}
              </p>
            </div>
          ) : null,
        )
      : null;
  }, [val]);
  return <div style={{ width: '100%', height: '100%', ...resultStyle }}>{render}</div>;
});

export default Index;
