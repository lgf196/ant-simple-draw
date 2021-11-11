import React, { memo, useMemo, FC } from 'react';

export type RenderTemplateType = {
  type: string;
  category: string;
};
const RenderTemplate: FC<RenderTemplateType> = memo(function RenderTemplate(props) {
  const { type, category } = props;

  const DynamicFunc = async (category: string, type: string) => {
    let Component: FC;

    if (category === 'base') {
      const { default: BaseCompent } = await import(`@/core/componentTemplate/${category}/${type}`);
      Component = BaseCompent;
    }

    return () => <Component />;
  };

  const Render = useMemo(() => {
    return DynamicFunc(category, type) as unknown as FC<RenderTemplateType>;
  }, [type, category]);

  return <Render {...props} />;
});

export default RenderTemplate;
