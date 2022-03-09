import React, { memo, FC } from 'react';
import { Form, Input, Button, Space, Checkbox } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
const TaskList: FC<{ keyName: string }> = memo(({ keyName }) => {
  return (
    <>
      <Form.List name={[keyName, 'list']}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: 'flex', marginBottom: 8, justifyContent: 'space-around' }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, 'check']}
                  style={{ marginBottom: '16px' }}
                  valuePropName="checked"
                >
                  <Checkbox></Checkbox>
                </Form.Item>
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
});

export default TaskList;
