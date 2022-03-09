import React, { FC, memo } from 'react';
import { Modal, Tabs } from 'antd';
import TabTitle from '@/layout/TabTitleComponent';
import { HighlightOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;

export interface ImageGalleryType {
  visible: boolean;
  onCancel: Function;
  callBack: (url: string) => void;
}
const ImageGallery: FC<ImageGalleryType> = memo(function ImageGallery({
  visible,
  onCancel,
  callBack,
}) {
  const handCancel = () => {
    onCancel();
  };
  const selectImage = (url: string) => {
    callBack && callBack(url);
    handCancel();
  };
  return (
    <>
      <Modal
        forceRender
        width={'65%'}
        visible={visible}
        title={null}
        maskClosable={false}
        onCancel={handCancel}
        bodyStyle={{ paddingLeft: '10px' }}
        footer={null}
      >
        <Tabs defaultActiveKey="1" tabPosition="left">
          <TabPane
            tab={
              <TabTitle
                title={'个人库'}
                icon={<HighlightOutlined style={{ margin: 0 }} />}
                position="left"
              />
            }
          >
            <ul>
              <li
                onClick={() =>
                  selectImage(
                    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                  )
                }
              >
                <img
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  alt="tu"
                  width={100}
                />
              </li>
              <li
                onClick={() => selectImage('https://i.ibb.co/377K3nW/20200108-213753-A9-TH8.jpg')}
              >
                <img
                  src="https://i.ibb.co/377K3nW/20200108-213753-A9-TH8.jpg"
                  alt="tu"
                  width={100}
                />
              </li>
            </ul>
          </TabPane>
          <TabPane
            key="2"
            tab={
              <TabTitle
                title={'照片库'}
                icon={<HighlightOutlined style={{ margin: 0 }} />}
                position="left"
              />
            }
          >
            Content of Tab Pane 2
          </TabPane>
          <TabPane
            key="3"
            tab={
              <TabTitle
                title={'背景库'}
                icon={<HighlightOutlined style={{ margin: 0 }} />}
                position="left"
              />
            }
          >
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
});

export default ImageGallery;
