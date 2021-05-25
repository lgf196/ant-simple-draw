import React, { useEffect, useState, useRef } from 'react';
import { Tabs, Row, Col, Input, Slider, Select, Button } from 'antd';
import FlowGraph from '@/pages/Graph';
import { Cell, Edge } from '@antv/x6';
import { useSetState } from '@/hooks';

const { TabPane } = Tabs;

export enum lineAttributes {
  stroke = 'line/stroke',
  strokeWidth = 'line/strokeWidth',
  strokeDasharray = 'line/strokeDasharray',
}
interface IProps {
  id: string;
}
interface EdgeAttrs {
  stroke: string;
  strokeWidth: number;
  connector: string;
  strokeDasharray: number;
}

export interface labelAttrsType {
  fontSize: number;
  fill: string;
  text: string;
}
export const labelsDefaults = {
  fontSize: 12,
  fill: '#666',
  text: '',
};

export const filterGetLabels = (labelArr: NonNullable<Edge.Label[]>) => {
  if (!labelArr.length) return labelsDefaults;
  return labelArr[0].attrs!.label;
};

export const handleGetLabels = (
  labelattrs: Partial<labelAttrsType>,
  labelsDefaults: labelAttrsType,
) => {
  return {
    attrs: { label: Object.assign({}, labelsDefaults, labelattrs) },
  };
};

export default function (props: IProps) {
  const { id } = props;
  const [labelattrs, setLabelattrs] =
    useSetState<labelAttrsType>(labelsDefaults);
  const [attrs, setAttrs] = useState<EdgeAttrs>({
    stroke: '#5F95FF',
    strokeWidth: 1,
    connector: 'normal',
    strokeDasharray: 0,
  });
  const cellRef = useRef<Cell>();

  useEffect(() => {
    if (id) {
      const { graph } = FlowGraph;
      const cell = graph.getCellById(id) as Edge;
      if (!cell || !cell.isEdge()) {
        return;
      }
      cellRef.current = cell as Edge;
      const connector = cell.getConnector() || {
        name: 'normal',
      };
      const getLabels = filterGetLabels(cell.getLabels());
      setAttr('stroke', cell.attr(lineAttributes.stroke));
      setAttr('strokeWidth', cell.attr(lineAttributes.strokeWidth));
      setAttr(
        'strokeDasharray',
        cell.attr(lineAttributes.strokeDasharray) || 0,
      );
      setAttr('connector', connector.name);
      setLabelattrs(getLabels);
    }
  }, [id]);

  const setAttr = (key: string, val: any) => {
    setAttrs((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const onStrokeChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAttr('stroke', val);
    cellRef.current!.attr(lineAttributes.stroke, val);
  };

  const onStrokeWidthChange = (
    val: number,
    path: lineAttributes,
    typeKey: string,
  ) => {
    setAttr(typeKey, val);
    cellRef.current!.attr(path, val);
  };

  const onConnectorChange = (val: string) => {
    setAttr('connector', val);
    const cell = cellRef.current as Edge;
    cell.setConnector(val);
  };

  const textChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    textKey: string,
    sliderVal?: number,
  ) => {
    const val = sliderVal ? sliderVal : e.target.value;
    const cell = cellRef.current as Edge;
    setLabelattrs({ [textKey]: val });
    cell.setLabels([handleGetLabels({ [textKey]: val }, labelattrs)]);
  };

  const removeConnector = () => {
    const cell = cellRef.current as Edge;
    cell.disconnect();
  };

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="线条" key="1">
        <Row align="middle">
          <Col span={8}>线宽</Col>
          <Col span={12}>
            <Slider
              min={1}
              max={5}
              step={1}
              value={attrs.strokeWidth}
              onChange={(val: number) =>
                onStrokeWidthChange(
                  val,
                  lineAttributes.strokeWidth,
                  'strokeWidth',
                )
              }
            />
          </Col>
          <Col span={2}>
            <div className="result">{attrs.strokeWidth}</div>
          </Col>
        </Row>
        <Row align="middle">
          <Col span={8}>间距</Col>
          <Col span={12}>
            <Slider
              min={0}
              max={10}
              step={1}
              value={attrs.strokeDasharray}
              onChange={(val: number) =>
                onStrokeWidthChange(
                  val,
                  lineAttributes.strokeDasharray,
                  'strokeDasharray',
                )
              }
            />
          </Col>
          <Col span={2}>
            <div className="result">{attrs.strokeDasharray}</div>
          </Col>
        </Row>
        <Row align="middle">
          <Col span={8}>颜色</Col>
          <Col span={14}>
            <Input
              type="color"
              value={attrs.stroke}
              style={{ width: '100%' }}
              onChange={onStrokeChange}
            />
          </Col>
        </Row>
        <Row align="middle">
          <Col span={8}>类型</Col>
          <Col span={14}>
            <Select
              style={{ width: '100%' }}
              value={attrs.connector}
              onChange={onConnectorChange}
            >
              <Select.Option value="normal">Normal</Select.Option>
              <Select.Option value="smooth">Smooth</Select.Option>
              <Select.Option value="rounded">Rounded</Select.Option>
              <Select.Option value="jumpover">Jumpover</Select.Option>
            </Select>
          </Col>
        </Row>
        <Row align="middle">
          <Col span={8}>文本</Col>
          <Col span={14}>
            <Input
              style={{ width: '100%' }}
              value={labelattrs.text}
              onChange={(val) => textChange(val, 'text')}
            />
          </Col>
        </Row>
        <Row align="middle">
          <Col span={8}>字体颜色</Col>
          <Col span={14}>
            <Input
              style={{ width: '100%' }}
              type="color"
              value={labelattrs.fill}
              onChange={(val) => textChange(val, 'fill')}
            />
          </Col>
        </Row>
        <Row align="middle">
          <Col span={8}>字体大小</Col>
          <Col span={12}>
            <Slider
              min={8}
              max={16}
              step={1}
              value={labelattrs.fontSize}
              onChange={(val: number) =>
                textChange(val as any, 'fontSize', val)
              }
            />
          </Col>
          <Col span={2}>
            <div className="result">{labelattrs.fontSize}</div>
          </Col>
        </Row>
        <Row align="middle">
          <Col span={10}>删除该线条</Col>
          <Col span={14}>
            <Button
              type="primary"
              size="small"
              danger
              onClick={removeConnector}
            >
              删除
            </Button>
          </Col>
        </Row>
      </TabPane>
    </Tabs>
  );
}
