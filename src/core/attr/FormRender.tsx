import React, { FC, memo, useEffect } from 'react';
import { Form, InputNumber } from 'antd';
import { Store } from 'antd/lib/form/interface';

export interface FormRenderType {
  editType: FormType[];
  onSave: Function;
  showEditPropsData: any;
}

const FormRender: FC<FormRenderType> = memo(function FormRender({
  editType,
  onSave,
  showEditPropsData,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(showEditPropsData);
    return () => {
      form.resetFields();
    };
  }, [form, showEditPropsData]);

  const onFinish = (values: Store) => {
    onSave && onSave(values);
  };

  const handlechange = () => {
    onFinish(form.getFieldsValue());
  };

  return (
    <>
      <Form form={form} name={`form_editor`} onFinish={onFinish} onValuesChange={handlechange}>
        {editType.map((item, index) => {
          return (
            <React.Fragment key={index}>
              {item.type === 'Number' && (
                <Form.Item label={item.name} name={item.key}>
                  <InputNumber size="small" addonAfter={item.addonAfter && item.addonAfter} />
                </Form.Item>
              )}
            </React.Fragment>
          );
        })}
      </Form>
    </>
  );
});

export default FormRender;
