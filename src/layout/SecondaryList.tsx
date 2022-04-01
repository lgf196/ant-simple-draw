import React, { FC, memo, useEffect } from 'react';
import styles from './layout.module.scss';
import { useSetState } from '@/hooks';
import Drag from '@/core/DragTargetComponent';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';

export interface oneModuleAllType {
  isShow: boolean;
  componentInfo: Partial<getAllConfigListType>;
}
export interface SecondaryListType {
  data: getAllConfigListType[];
  fatherData: getAllConfigListType;
}
const SecondaryList: FC<SecondaryListType> = memo(({ data, fatherData }) => {
  const [oneModuleAll, setOneModuleAll] = useSetState<oneModuleAllType>({
    isShow: false,
    componentInfo: {},
  });

  return (
    <>
      <div
        className={styles.contentContainer}
        style={{
          display: !oneModuleAll.isShow ? 'block' : 'none',
        }}
      >
        {data.map((child, k) => (
          <React.Fragment key={k}>
            <>
              <div className={styles.head}>
                <h2 className={styles.title}>{child.title}</h2>
                <button
                  className={styles.more}
                  onClick={() => setOneModuleAll({ isShow: true, componentInfo: child })}
                >
                  <span>全部</span>
                  <RightOutlined />
                </button>
              </div>
              <Drag list={child.componentList} category={fatherData.category} />
            </>
          </React.Fragment>
        ))}
      </div>
      <div
        className={styles.contentContainer}
        style={{
          display: oneModuleAll.isShow ? 'block' : 'none',
        }}
      >
        <div className={styles.moreList}>
          <button className={styles.more} onClick={() => setOneModuleAll({ isShow: false })}>
            <LeftOutlined />
            <span>{oneModuleAll.componentInfo.title}</span>
          </button>
          <Drag list={oneModuleAll.componentInfo.componentList!} category={fatherData.category} />
        </div>
      </div>
    </>
  );
});

export default SecondaryList;
