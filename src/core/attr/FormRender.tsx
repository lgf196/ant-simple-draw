import React, { FC, memo, useEffect } from 'react';
import { Form, InputNumber, Row, Col } from 'antd';
import { Store } from 'antd/lib/form/interface';
import AttrContainer from './AttrContainer';
import BackGround from '@/components/BackGround';
export interface FormRenderType {
  editType: FormType[];
  onSave: Function;
  id: string;
  showEditPropsData: any;
}

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
      <Row>
        {editType.map((item, index) => {
          return (
            <React.Fragment key={index}>
              {item.type === 'Number' && (
                <Col span={colFun(item.col)}>
                  <Form.Item label={item.name} name={item.key}>
                    <InputNumber size="small" />
                  </Form.Item>
                </Col>
              )}

              {item.type === 'Background' && (
                <Col span={colFun(item.col)}>
                  <Form.Item label={item.name} name={item.key}>
                    <BackGround />
                  </Form.Item>
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
