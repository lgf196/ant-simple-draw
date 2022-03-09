import React, { AnchorHTMLAttributes, FC, memo } from 'react';

export interface ComponentTypr extends AnchorHTMLAttributes<any> {
  model: 'editor' | 'preview' | 'publish';
  name: string;
}
const Component: FC<ComponentTypr> = memo(({ name, model = 'editor', ...props }) => {
  return (
    <>
      {model === 'editor' ? (
        <span>{name}</span>
      ) : (
        <a rel="link" {...props}>
          {name}
        </a>
      )}
    </>
  );
});

export default Component;
