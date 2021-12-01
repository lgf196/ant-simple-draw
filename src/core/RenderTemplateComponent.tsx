import React, { memo, useMemo, FC, Suspense } from 'react';
import { lazyComponent } from '@/utils/function';
import { Spin } from 'antd';
export type RenderTemplateType = {
  type: string;
  category: string;
  style: React.CSSProperties;
};

const DynamicFunc = (category: string, type: string) => {
  let Component: FC<RenderTemplateType>;
  Component = lazyComponent(category, type);
  return (props: RenderTemplateType) => (
    <Suspense fallback={<Spin />}>
      <Component {...props} />
    </Suspense>
  );
};

const RenderTemplate: FC<RenderTemplateType> = memo(function RenderTemplate(props) {
  const { type, category } = props;

  const Dynamic = useMemo(() => {
    return DynamicFunc(category, type) as unknown as FC<RenderTemplateType>;
  }, [type, category]);

  return <Dynamic {...props} />;
});
export default RenderTemplate;
