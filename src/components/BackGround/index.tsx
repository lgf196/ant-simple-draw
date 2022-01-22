import React, { memo, useState, useEffect } from 'react';
import { gradientList } from './defaultGradient';
import style from './index.module.scss';
import { Tabs } from 'antd';
import { RgbaStringColorPicker } from 'react-colorful';
import { InputNumber } from 'antd';
const { TabPane } = Tabs;
const BackGround = memo(function BackGround(props) {
  const [color, setColor] = useState<any>('#aabbcc');
  const [visible, setVisible] = useState<boolean>(false);
  useEffect(() => {
    document.addEventListener('click', (e) => {
      var _con = document.getElementById('bgContainer'),
        _open = document.getElementById('bgContainerModal');
      if (_con) {
        if (!_con.contains(e.target as Node)) {
          /**
           * @description 点击空白地方，关闭弹窗
           */
          if (_open && !_open.contains(e.target as Node)) {
            setVisible(false);
          }
        }
      }
    });
    return () => {
      document.removeEventListener('click', () => null);
    };
  }, []);
  return (
    <>
      <div
        className={style.bgContainer}
        id="bgContainer"
        onClick={(e) => {
          setVisible((pre) => !pre);
        }}
      ></div>
      {visible ? (
        <div className={style.modal} id="bgContainerModal">
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="渐变色" key="1">
              <ul className={style.gradient}>
                {gradientList.map((item, index) => (
                  <li style={{ backgroundImage: item }} key={index}></li>
                ))}
              </ul>
            </TabPane>
            <TabPane tab="纯色" key="2">
              <div className={`custom-pointers ${style.pickColor}`}>
                <RgbaStringColorPicker
                  onChange={(val) => {
                    console.log('val', val);
                  }}
                />
                <div className={style.pickColorController}>
                  <div>
                    <InputNumber defaultValue={100} />
                    <p>R</p>
                  </div>
                  <div>
                    <InputNumber defaultValue={100} />
                    <p>G</p>
                  </div>
                  <div>
                    <InputNumber defaultValue={100} />
                    <p>B</p>
                  </div>
                  <div>
                    <InputNumber defaultValue={100} />
                    <p>A</p>
                  </div>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
      ) : null}
    </>
  );
});

export default BackGround;
