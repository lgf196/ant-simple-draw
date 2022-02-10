import React, { FC, memo, useEffect } from 'react';
import { Form, InputNumber, Row, Col, Switch, Input, Slider, Tooltip } from 'antd';
import { Store } from 'antd/lib/form/interface';
import AttrContainer from './AttrContainer';
import BackGround from '@/components/BackGround';
import ImgComponent from '@/components/ImageComponent';
import Border from '@/components/Border';
import FontStyle from '@/components/FontStyle';
import Padding from '@/components/Padding';
import BorderRadius from '@/components/BorderRadius';
import { ExclamationCircleOutlined } from '@ant-design/icons';
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
            <React.Fragment key={item.key}>
              {item.type === 'Number' && (
                <Col span={colFun(item.col)}>
                  <AttrContainer border={item.border || false} title={item.title}>
                    <Form.Item label={item.name} name={item.key} style={{ margin: '0' }}>
                      <InputNumber style={{ width: item.width }} min={0} />
                    </Form.Item>
                  </AttrContainer>
                </Col>
              )}
              {item.type === 'Background' && (
                <Col span={colFun(item.col)}>
                  <AttrContainer title={item.title}>
                    <Form.Item label={item.name} name={item.key} style={{ margin: '0' }}>
                      <BackGround />
                    </Form.Item>
                  </AttrContainer>
                </Col>
              )}
              {item.type === 'Switch' && (
                <Col span={colFun(item.col)}>
                  <AttrContainer title={item.title}>
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
                  <AttrContainer title={item.title}>
                    <Form.Item label={null} name={item.key} style={{ margin: '0' }}>
                      <ImgComponent />
                    </Form.Item>
                  </AttrContainer>
                </Col>
              )}
              {item.type === 'TextArea' && (
                <Col span={colFun(item.col)}>
                  <AttrContainer border={false} title={item.title}>
                    <Form.Item label={null} name={item.key} style={{ margin: '0' }}>
                      <TextArea autoSize={{ minRows: 2 }} showCount />
                    </Form.Item>
                  </AttrContainer>
                </Col>
              )}
              {item.type === 'Color' && (
                <Col span={colFun(item.col)}>
                  <AttrContainer title={item.title}>
                    <Form.Item label={item.name} name={item.key} style={{ margin: '0' }}>
                      <Input type={'color'} />
                    </Form.Item>
                  </AttrContainer>
                </Col>
              )}
              {item.type === 'Border' && (
                <Col span={colFun(item.col)}>
                  <AttrContainer title={item.title}>
                    <Form.Item label={item.name} name={item.key} style={{ margin: '0' }}>
                      <Border />
                    </Form.Item>
                  </AttrContainer>
                </Col>
              )}
              {item.type === 'Slider' && (
                <Col span={colFun(item.col)}>
                  <AttrContainer title={item.title}>
                    <Form.Item
                      label={item.name}
                      name={item.key}
                      style={{ margin: '0' }}
                      initialValue={100}
                    >
                      <Slider tipFormatter={(val) => val + '%'} />
                    </Form.Item>
                  </AttrContainer>
                </Col>
              )}
              {item.type === 'FontStyle' && (
                <Col span={colFun(item.col)}>
                  <AttrContainer title={item.title}>
                    <Form.Item label={null} name={item.key} style={{ margin: '0' }}>
                      <FontStyle />
                    </Form.Item>
                  </AttrContainer>
                </Col>
              )}
              {item.type === 'Padding' && (
                <Col span={colFun(item.col)}>
                  <AttrContainer title={item.title}>
                    <Form.Item
                      label={item.name}
                      name={item.key}
                      style={{ margin: '0', display: 'flex', alignItems: 'center' }}
                    >
                      <Padding />
                    </Form.Item>
                  </AttrContainer>
                </Col>
              )}

              {item.type === 'BorderRadius' && (
                <Col span={colFun(item.col)}>
                  <AttrContainer title={item.title}>
                    <Form.Item
                      label={
                        <div>
                          <span> {item.name}</span>
                          <Tooltip title="只有在背景，边框等样式下有效果">
                            <ExclamationCircleOutlined
                              style={{ color: '#9da3ac', paddingLeft: '3px', fontSize: '17px' }}
                            />
                          </Tooltip>
                        </div>
                      }
                      name={item.key}
                      style={{ margin: '0', display: 'flex', alignItems: 'center' }}
                    >
                      <BorderRadius />
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
