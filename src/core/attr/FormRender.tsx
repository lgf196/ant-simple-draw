import React, { FC, memo, useEffect } from 'react';
import { Form, InputNumber, Row, Col, Switch, Input } from 'antd';
import { Store } from 'antd/lib/form/interface';
import AttrContainer from './AttrContainer';
import BackGround from '@/components/BackGround';
import ImgComponent from '@/components/ImageComponent';
export interface FormRenderType {
  editType: FormType[];
  onSave: Function;
  id: string;
  showEditPropsData: any;
}

const { TextArea } = Input;

const FormRender: FC<FormRenderType> = memo(function FormRender({
  editType,
  onSave,
  showEditPropsData,
  id,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(showEditPropsData);
    return () => {
      form.resetFields();
    };
  }, [form, id]);

  const onFinish = (values: Store) => {
    onSave && onSave(values);
  };

  const handlechange = () => {
    onFinish(form.getFieldsValue());
  };

  const colFun = (col: number | undefined) => (col ? col : 24);

  return (
    <Form form={form} name={`form_editor`} onFinish={onFinish} onValuesChange={handlechange}>
      <Row gutter={[30, 0]}>
        {editType.map((item, index) => {
          return (
            <React.Fragment key={index}>
              {item.type === 'Number' && (
                <Col span={colFun(item.col)}>
                  <AttrContainer border={false}>
                    <Form.Item label={item.name} name={item.key} style={{ margin: '0' }}>
                      <InputNumber size="small" />
                    </Form.Item>
                  </AttrContainer>
                </Col>
              )}
              {item.type === 'Background' && (
                <Col span={colFun(item.col)}>
                  <AttrContainer>
                    <Form.Item label={item.name} name={item.key} style={{ margin: '0' }}>
                      <BackGround />
                    </Form.Item>
                  </AttrContainer>
                </Col>
              )}
              {item.type === 'Switch' && (
                <Col span={colFun(item.col)}>
                  <AttrContainer>
                    <Form.Item
                      style={{ margin: '0' }}
                      label={item.name}
                      name={item.key}
                      valuePropName="checked"
                      labelAlign="left"
                      labelCol={{ span: 19 }}
                    >
                      <Switch />
                    </Form.Item>
                  </AttrContainer>
                </Col>
              )}
              {item.type === 'Image' && (
                <Col span={colFun(item.col)}>
                  <AttrContainer title={item.name}>
                    <Form.Item label={null} name={item.key} style={{ margin: '0' }}>
                      <ImgComponent />
                    </Form.Item>
                  </AttrContainer>
                </Col>
              )}
              {item.type === 'TextArea' && (
                <Col span={colFun(item.col)}>
                  <AttrContainer border={false} title={item.name}>
                    <Form.Item label={null} name={item.key} style={{ margin: '0' }}>
                      <TextArea autoSize={{ minRows: 2 }} showCount />
                    </Form.Item>
                  </AttrContainer>
                </Col>
              )}
            </React.Fragment>
          );
        })}
      </Row>
    </Form>
  );
});

export default FormRender;
