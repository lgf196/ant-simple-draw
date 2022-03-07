import React, { FC, memo, useEffect } from 'react';
import { Form, InputNumber, Row, Col, Switch, Input, Slider, Tooltip, Radio } from 'antd';
import { Store } from 'antd/lib/form/interface';
import AttrContainer from './AttrContainer';
import BackGround from '@/components/BackGround';
import ImgComponent from '@/components/ImageComponent';
import Border from '@/components/Border';
import FontStyle from '@/components/FontStyle';
import Padding from '@/components/Padding';
import BorderRadius from '@/components/BorderRadius';
import TextShadow from '@/components/TextShadow';
import BoxShadow from '@/components/BoxShadow';
import WangEditor from '@/components/WangEditor';
import Selects from '@/components/Select';
import OlUl from '@/components/OlUl';
import { ExclamationCircleOutlined } from '@ant-design/icons';
export interface FormRenderType {
  editType: FormType[];
  onSave: Function;
  id: string;
  showEditPropsData: any;
}

const { TextArea } = Input;

const FormRender: FC<FormRenderType> = memo(
  function FormRender({ editType, onSave, showEditPropsData, id }) {
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
                {item.type === 'Input' && (
                  <Col span={colFun(item.col)}>
                    <AttrContainer border={true} title={item.title}>
                      <Form.Item label={item.name} name={item.key} style={{ margin: '0' }}>
                        <Input />
                      </Form.Item>
                    </AttrContainer>
                  </Col>
                )}
                {item.type === 'RichText' && (
                  <Col span={colFun(item.col)}>
                    <AttrContainer
                      border={false}
                      title={item.title}
                      containerStyle={{ padding: '0' }}
                    >
                      <Form.Item label={null} name={item.key} style={{ margin: '0' }}>
                        <WangEditor />
                      </Form.Item>
                    </AttrContainer>
                  </Col>
                )}
                {item.type === 'Radio' && (
                  <Col span={colFun(item.col)}>
                    <AttrContainer border={true} title={item.title}>
                      <Form.Item label={item.name} name={item.key} style={{ margin: '0' }}>
                        <Radio.Group>
                          {item.options!.map((items, index) => (
                            <Radio value={items.value} key={index}>
                              {items.label}
                            </Radio>
                          ))}
                        </Radio.Group>
                      </Form.Item>
                    </AttrContainer>
                  </Col>
                )}
                {item.type === 'Select' && (
                  <Col span={colFun(item.col)}>
                    <AttrContainer border={true} title={item.title}>
                      <Form.Item label={item.name} name={item.key} style={{ margin: '0' }}>
                        <Selects data={item.options!} valKey={'value'} valName={'label'} />
                      </Form.Item>
                    </AttrContainer>
                  </Col>
                )}
                {item.type === 'TextArea' && (
                  <Col span={colFun(item.col)}>
                    <AttrContainer
                      border={false}
                      title={item.title}
                      containerStyle={{ padding: '0' }}
                    >
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

                {item.type === 'TextShadow' && (
                  <Col span={colFun(item.col)}>
                    <AttrContainer title={item.title}>
                      <Form.Item
                        label={item.name}
                        name={item.key}
                        style={{ margin: '0', display: 'flex', alignItems: 'center' }}
                      >
                        <TextShadow />
                      </Form.Item>
                    </AttrContainer>
                  </Col>
                )}

                {item.type === 'BoxShadow' && (
                  <Col span={colFun(item.col)}>
                    <AttrContainer title={item.title}>
                      <Form.Item
                        label={
                          <div>
                            <span> {item.name}</span>
                            <Tooltip title="只有在背景下有效果">
                              <ExclamationCircleOutlined
                                style={{ color: '#9da3ac', paddingLeft: '3px', fontSize: '17px' }}
                              />
                            </Tooltip>
                          </div>
                        }
                        name={item.key}
                        style={{ margin: '0', display: 'flex', alignItems: 'center' }}
                      >
                        <BoxShadow />
                      </Form.Item>
                    </AttrContainer>
                  </Col>
                )}
                {item.type === 'OlUl' && (
                  <Col span={colFun(item.col)}>
                    <AttrContainer title={item.title}>
                      <Form.Item style={{ margin: '0' }}>
                        <OlUl
                          keyName={item.key}
                          form={form}
                          showEditPropsData={showEditPropsData}
                        />
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
  },
  (prevProps, nextProps) => {
    if (prevProps.id !== nextProps.id) {
      // 防止多次出发组件
      return false;
    } else {
      return true;
    }
  },
);

export default FormRender;
