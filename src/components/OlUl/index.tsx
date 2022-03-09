import React, { memo, FC, useState, useMemo, useEffect } from 'react';
import { Radio, Form, Input, FormInstance, Button, Space } from 'antd';
import Selects from '../Select';
import { Store } from 'antd/lib/form/interface';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
const OlUl: FC<{ keyName: string; form: FormInstance<Store>; showEditPropsData: any }> = memo(
  ({ keyName, form, showEditPropsData }) => {
    const [type, setType] = useState<string | undefined>(undefined);
    const ulType = [
      { label: '小圆点', value: 'disc' },
      { label: '空心圆圈', value: 'circle' },
      { label: '小方块', value: 'square' },
    ];
    const olType = [
      { label: '1', value: '1' },
      { label: 'A', value: 'A' },
      { label: 'I', value: 'I' },
    ];

    useEffect(() => {
      if (showEditPropsData[keyName]) {
        // 将数据流的数据同步一下
        setType(showEditPropsData[keyName].type);
      }
    }, [showEditPropsData, keyName]);

    const selectData = useMemo(() => {
      return type === 'ol' ? olType : ulType;
    }, [type]);

    return (
      <>
        <Form.Item label={null} name={[keyName, 'type']} style={{ marginBottom: '16px' }}>
          <Radio.Group
            onChange={(val) => {
              setType(val.target.value);
              form.setFieldsValue({
                [keyName]: {
                  attrType: undefined,
                },
              });
            }}
          >
            <Radio value={'ol'}>有序列表</Radio>
            <Radio value={'ul'}>无序列表</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label={'序列'} name={[keyName, 'attrType']} style={{ marginBottom: '16px' }}>
          <Selects data={selectData} valKey="value" valName="label" />
        </Form.Item>
        <Form.List name={[keyName, 'list']}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: 'flex', marginBottom: 8, justifyContent: 'space-around' }}
                  align="baseline"
                >
                  <Form.Item {...restField} name={[name, 'text']} style={{ marginBottom: '16px' }}>
                    <Input />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} title="移除" />
                </Space>
              ))}
              <Form.Item style={{ marginBottom: '16px' }}>
                <Button onClick={() => add()} block icon={<PlusOutlined />}>
                  添加数据
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </>
    );
  },
);

export default OlUl;
