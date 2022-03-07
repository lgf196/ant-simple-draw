import React, { memo, FC, useState, useMemo, useEffect } from 'react';
import { Radio, Form, Input, FormInstance, Button } from 'antd';
import Selects from '../Select';
import { useSetState } from '@/hooks';
import { Store } from 'antd/lib/form/interface';
import { DeleteOutlined } from '@ant-design/icons';
const OlUl: FC<{ keyName: string; form: FormInstance<Store>; showEditPropsData: any }> = memo(
  ({ keyName, form, showEditPropsData }) => {
    const defaultText = [{ text: '' }];
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
    const [stepList, setStepList] = useState<Array<{ text: string }>>(defaultText);
    useEffect(() => {
      if (showEditPropsData && showEditPropsData[keyName]) {
        // form.setFieldsValue({
        //   [keyName]: {
        //     list: showEditPropsData[keyName].list,
        //   },
        // });
        setStepList(showEditPropsData[keyName].list);
        console.log('showEditPropsData', showEditPropsData);
      }
      // if (list) {
      //   setStepList(list);
      // }
    }, [keyName, showEditPropsData]);
    const mapRender = (data: Array<{ text: string }>) => {
      return data.map((item, index) => (
        <div
          style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'baseline' }}
          key={index}
        >
          <Form.Item
            label={null}
            labelAlign="left"
            name={[keyName, 'list', index, 'text']}
            style={{ marginBottom: '16px' }}
          >
            <Input />
          </Form.Item>
          <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => remove(index, keyName)} />
        </div>
      ));
    };
    const selectData = useMemo(() => {
      return type === 'ol' ? olType : ulType;
    }, [type]);

    const add = () => {
      setStepList([...stepList, ...defaultText]);
    };
    const remove = (index: number, keyName: string) => {
      setStepList(stepList.filter((item, k) => k !== index));
      const okrObjectVos = form.getFieldValue([keyName, 'list']) as Array<{ text: string }>;

      if (okrObjectVos) {
        console.log('first', okrObjectVos);
        form.setFieldsValue({
          [keyName]: {
            list: [],
          },
        });
      }
    };
    return (
      <>
        <Form.Item label={null} name={[keyName, 'type']} style={{ marginBottom: '16px' }}>
          <Radio.Group
            onChange={(val) => {
              setType(val.target.value);
              form.setFieldsValue({
                [keyName]: {
                  attrType: '',
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
        {mapRender(stepList)}
        {stepList.length}
        <Button style={{ width: '100%' }} onClick={add}>
          添加数据
        </Button>
      </>
    );
  },
);

export default OlUl;
