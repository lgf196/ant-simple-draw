import React, { memo, FC, useMemo } from 'react';
import { Row, Col, Input, Slider, Divider } from 'antd';
import { combinationAttrs, combinationAttrsPath } from './combinationAttrs';
import { EventChange } from '@/interface';
import ImgCrop from 'antd-img-crop';
import ImgUpload from '@/pages/components/upload/imgUpload';
import { UploadChangeParam } from 'antd/lib/upload';
const { TextArea } = Input;

export interface CombinationNodeType {
  combinationGraphicsAttrs: combinationAttrs;
  combinationInputChange: EventChange<
    React.ChangeEvent<HTMLInputElement>,
    combinationAttrsPath,
    combinationAttrs
  >;
  combinationSliderChange: EventChange<
    number,
    combinationAttrsPath,
    combinationAttrs
  >;
  imageUpload: (info: UploadChangeParam) => void;
}

const CombinationNode: FC<CombinationNodeType> = memo(function CombinationNode({
  combinationGraphicsAttrs,
  combinationInputChange,
  combinationSliderChange,
  imageUpload,
}) {
  const render = useMemo(
    () => (
      <>
        <Divider>标题项</Divider>
        <Row align="middle">
          <Col span={8}>标题值</Col>
          <Col span={14}>
            <Input
              value={combinationGraphicsAttrs.titleText}
              style={{ width: '100%' }}
              onChange={(val) =>
                combinationInputChange(
                  val,
                  combinationAttrsPath.titleText,
                  'titleText',
                )
              }
            />
          </Col>
        </Row>
        <Row align="middle">
          <Col span={8}>标题大小</Col>
          <Col span={12}>
            <Slider
              min={8}
              max={16}
              step={1}
              value={combinationGraphicsAttrs.titlefontSize}
              onChange={(val: number) =>
                combinationSliderChange(
                  val,
                  combinationAttrsPath.titlefontSize,
                  'titlefontSize',
                )
              }
            />
          </Col>
          <Col span={2}>
            <div className="result">
              {combinationGraphicsAttrs.titlefontSize}
            </div>
          </Col>
        </Row>
        <Row align="middle">
          <Col span={8}>标题颜色</Col>
          <Col span={14}>
            <Input
              type="color"
              value={combinationGraphicsAttrs.titleFill}
              style={{ width: '100%' }}
              onChange={(val) =>
                combinationInputChange(
                  val,
                  combinationAttrsPath.titleFill,
                  'titleFill',
                )
              }
            />
          </Col>
        </Row>
        <Divider>文本项</Divider>
        <Row align="middle">
          <Col span={8}>文本值</Col>
          <Col span={14}>
            <TextArea
              value={combinationGraphicsAttrs.textText}
              style={{ width: '100%' }}
              autoSize={{ minRows: 2 }}
              onChange={(val) =>
                combinationInputChange(
                  val as any,
                  combinationAttrsPath.textText,
                  'textText',
                )
              }
            />
          </Col>
        </Row>
        <Row align="middle">
          <Col span={8}>文本大小</Col>
          <Col span={12}>
            <Slider
              min={8}
              max={16}
              step={1}
              value={combinationGraphicsAttrs.textfontSize}
              onChange={(val: number) =>
                combinationSliderChange(
                  val,
                  combinationAttrsPath.textfontSize,
                  'textfontSize',
                )
              }
            />
          </Col>
          <Col span={2}>
            <div className="result">
              {combinationGraphicsAttrs.textfontSize}
            </div>
          </Col>
        </Row>
        <Row align="middle">
          <Col span={8}>文本颜色</Col>
          <Col span={14}>
            <Input
              type="color"
              value={combinationGraphicsAttrs.textFill}
              style={{ width: '100%' }}
              onChange={(val) =>
                combinationInputChange(
                  val,
                  combinationAttrsPath.textFill,
                  'textFill',
                )
              }
            />
          </Col>
        </Row>
        <Divider>图像项</Divider>
        <Row align="middle">
          <Col span={8}>图片</Col>
          <Col span={16}>
            <ImgCrop rotate>
              <ImgUpload
                typeModule={2}
                limit={1}
                onChange={imageUpload}
                fileList={combinationGraphicsAttrs.imageHref}
              />
            </ImgCrop>
          </Col>
        </Row>
        <Row align="middle">
          <Col span={8}>宽</Col>
          <Col span={12}>
            <Slider
              min={8}
              max={50}
              step={1}
              value={combinationGraphicsAttrs.imageW}
              onChange={(val: number) =>
                combinationSliderChange(
                  val,
                  combinationAttrsPath.imageW,
                  'imageW',
                )
              }
            />
          </Col>
          <Col span={2}>
            <div className="result">{combinationGraphicsAttrs.imageW}</div>
          </Col>
        </Row>
        <Row align="middle">
          <Col span={8}>高</Col>
          <Col span={12}>
            <Slider
              min={8}
              max={50}
              step={1}
              value={combinationGraphicsAttrs.imageH}
              onChange={(val: number) =>
                combinationSliderChange(
                  val,
                  combinationAttrsPath.imageH,
                  'imageH',
                )
              }
            />
          </Col>
          <Col span={2}>
            <div className="result">{combinationGraphicsAttrs.imageH}</div>
          </Col>
        </Row>
        <Row align="middle">
          <Col span={8}>x</Col>
          <Col span={12}>
            <Slider
              min={8}
              max={25}
              step={1}
              value={combinationGraphicsAttrs.imageX}
              onChange={(val: number) =>
                combinationSliderChange(
                  val,
                  combinationAttrsPath.imageX,
                  'imageX',
                )
              }
            />
          </Col>
          <Col span={2}>
            <div className="result">{combinationGraphicsAttrs.imageX}</div>
          </Col>
        </Row>
        <Row align="middle">
          <Col span={8}>y</Col>
          <Col span={12}>
            <Slider
              min={8}
              max={25}
              step={1}
              value={combinationGraphicsAttrs.imageY}
              onChange={(val: number) =>
                combinationSliderChange(
                  val,
                  combinationAttrsPath.imageY,
                  'imageY',
                )
              }
            />
          </Col>
          <Col span={2}>
            <div className="result">{combinationGraphicsAttrs.imageY}</div>
          </Col>
        </Row>
      </>
    ),
    [combinationGraphicsAttrs],
  );

  return <>{render}</>;
});

export default CombinationNode;
