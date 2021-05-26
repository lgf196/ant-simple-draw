import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import { Tabs, Row, Col, Input, Slider, Button } from 'antd';
import FlowGraph from '@/pages/Graph';
import { Cell } from '@antv/x6';
import { useSetState } from '@/hooks';
import {
  combinationAttrs,
  combinationAttrsPath,
  defaultCombinationGraphicsAttrs,
} from './combinationAttrs';
import { shapeName } from '@/pages/Graph/config';
import CombinationNode from './combinationNode';
import BasisNode from './basisNode';
import { EventChange } from '@/interface';
import { uploadImageFormat } from '@/utils/varbile';
import { ImgUploadFile } from '../../upload/imgUpload';
import { UploadChangeParam } from 'antd/lib/upload';
const { TabPane } = Tabs;
export interface IProps {
  id: string;
}
export interface NodeAttrs {
  stroke: string;
  strokeWidth: number;
  fill: string;
  fontSize: number;
  color: string;
  text: string;
}

export enum attrsType {
  stroke = 'body/stroke',
  strokeWidth = 'body/strokeWidth',
  fill = 'body/fill',
  fontSize = 'text/fontSize',
  color = 'text/fill',
  text = 'text/textWrap/text',
}

export default function (props: IProps) {
  const { id } = props;
  const [attrs, setAttrs] = useState<NodeAttrs>({
    stroke: '#5F95FF',
    strokeWidth: 1,
    fill: 'rgba(95,149,255,0.05)',
    fontSize: 12,
    color: 'rgba(0,0,0,0.85)',
    text: '',
  });

  const [combinationGraphicsAttrs, setCombinationGraphicsAttrs] =
    useSetState<combinationAttrs>(defaultCombinationGraphicsAttrs);

  const cellRef = useRef<Cell>();

  useEffect(() => {
    if (id) {
      const { graph } = FlowGraph;
      const cell = graph.getCellById(id);
      if (!cell || !cell.isNode()) {
        return;
      }
      cellRef.current = cell;
      console.log(`cell`, cell);
      setAttrs({
        stroke: cell.attr(attrsType.stroke),
        strokeWidth: cell.attr(attrsType.strokeWidth),
        fill: cell.attr(attrsType.fill),
        fontSize: cell.attr(attrsType.fontSize),
        color: cell.attr(attrsType.color),
        text: cell.attr(attrsType.text),
      });
      if (cell.shape !== shapeName.flowChartRect) {
        setCombinationGraphicsAttrs({
          titleText: cell.attr(combinationAttrsPath.titleText),
          titlefontSize: cell.attr(combinationAttrsPath.titlefontSize),
          titleFill: cell.attr(combinationAttrsPath.titleFill),
          textText: cell.attr(combinationAttrsPath.textText),
          textfontSize: cell.attr(combinationAttrsPath.textfontSize),
          textFill: cell.attr(combinationAttrsPath.textFill),
          imageHref: cell.attr(combinationAttrsPath.imageHref)
            ? uploadImageFormat(cell.attr(combinationAttrsPath.imageHref))
            : uploadImageFormat(),
          imageW: cell.attr(combinationAttrsPath.imageW),
          imageH: cell.attr(combinationAttrsPath.imageH),
          imageX: cell.attr(combinationAttrsPath.imageX),
          imageY: cell.attr(combinationAttrsPath.imageY),
        });
      }
    }
  }, [id]);

  const setAttr = (key: string, val: any) => {
    setAttrs((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const sliderChange: EventChange<number, attrsType, NodeAttrs> = useCallback(
    (val, attrType, attrKey) => {
      setAttr(attrKey, val);
      cellRef.current!.attr(attrType, val);
    },
    [attrs],
  );

  const inputChange: EventChange<
    React.ChangeEvent<HTMLInputElement>,
    attrsType,
    NodeAttrs
  > = useCallback(
    (e, attrType, attrKey) => {
      const val = e.target.value;
      setAttr(attrKey, val);
      cellRef.current!.attr(attrType, val);
    },
    [attrs],
  );

  const deleteNode = () => {
    cellRef.current!.remove();
  };

  const combinationSliderChange: EventChange<
    number,
    combinationAttrsPath,
    combinationAttrs
  > = useCallback(
    (val, attrType, attrKey) => {
      setCombinationGraphicsAttrs({ [attrKey]: val });
      cellRef.current!.attr(attrType, val);
    },
    [combinationGraphicsAttrs],
  );

  const combinationInputChange: EventChange<
    React.ChangeEvent<HTMLInputElement>,
    combinationAttrsPath,
    combinationAttrs
  > = useCallback(
    (e, attrType, attrKey) => {
      const val = e.target.value;
      setCombinationGraphicsAttrs({ [attrKey]: val });
      cellRef.current!.attr(attrType, val);
    },
    [combinationGraphicsAttrs],
  );

  const imageUpload = (val: UploadChangeParam) => {
    const fileList = val as unknown as ImgUploadFile[];
    if (!fileList.length) return;
    const url = fileList[0].url;
    setCombinationGraphicsAttrs({ imageHref: fileList });
    cellRef.current!.attr(combinationAttrsPath.imageHref, url);
  };

  const render = useMemo(() => {
    return cellRef.current?.shape === shapeName.flowChartRect ? (
      <BasisNode
        attrs={attrs}
        sliderChange={sliderChange}
        inputChange={inputChange}
      />
    ) : (
      <CombinationNode
        combinationGraphicsAttrs={combinationGraphicsAttrs}
        combinationInputChange={combinationInputChange}
        combinationSliderChange={combinationSliderChange}
        imageUpload={imageUpload}
      />
    );
  }, [cellRef.current, attrs, combinationGraphicsAttrs]);

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="属性" key="1">
        <Row align="middle">
          <Col span={8}>边框颜色</Col>
          <Col span={14}>
            <Input
              type="color"
              value={attrs.stroke}
              style={{ width: '100%' }}
              onChange={(val) => inputChange(val, attrsType.stroke, 'stroke')}
            />
          </Col>
        </Row>
        <Row align="middle">
          <Col span={8}>边框宽度</Col>
          <Col span={12}>
            <Slider
              min={1}
              max={5}
              step={1}
              value={attrs.strokeWidth}
              onChange={(val: number) =>
                sliderChange(val, attrsType.strokeWidth, 'strokeWidth')
              }
            />
          </Col>
          <Col span={2}>
            <div className="result">{attrs.strokeWidth}</div>
          </Col>
        </Row>
        <Row align="middle">
          <Col span={8}>填充色</Col>
          <Col span={14}>
            <Input
              type="color"
              value={attrs.fill}
              style={{ width: '100%' }}
              onChange={(val) => inputChange(val, attrsType.fill, 'fill')}
            />
          </Col>
        </Row>
        <Row align="middle">
          <Col span={10}>删除该节点</Col>
          <Col span={14}>
            <Button type="primary" size="small" danger onClick={deleteNode}>
              删除
            </Button>
          </Col>
        </Row>
        {render}
      </TabPane>
    </Tabs>
  );
}
