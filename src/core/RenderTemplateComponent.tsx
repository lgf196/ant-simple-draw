import React, { memo, useMemo, FC, Suspense } from 'react';
import { lazyComponent } from '@/utils/function';
import { Spin } from 'antd';
import styles from './index.module.scss';

export type RenderTemplateType = {
  type: string;
  category: string;
};

const DynamicFunc = (category: string, type: string) => {
  let Component: FC<templateDataType>;
  Component = lazyComponent(category, type);
  return (props: templateDataType) => (
    <Suspense fallback={<Spin />}>
      <div
        style={{ ...props.style }}
        id={`components_${props.componentId}`}
        className={styles.renderComponent}
      >
        <Component {...props} />
      </div>
    </Suspense>
  );
};

const RenderTemplate: FC<templateDataType> = memo(function RenderTemplate(props) {
  const { type, category } = props;

  const Dynamic = useMemo(() => {
    return DynamicFunc(category, type) as unknown as FC<RenderTemplateType>;
  }, [type, category]);

  return <Dynamic {...props} />;
});
export default RenderTemplate;
