import React, { useRef, useEffect } from 'react';
import { SlateDescendant, IEditorConfig, createEditor } from '@wangeditor/editor';

interface IProps {
  defaultContent?: SlateDescendant[];
  defaultHtml?: string;
  defaultConfig: Partial<IEditorConfig>;
  mode?: string;
  style?: React.CSSProperties;
}

function EditorComponent(props: Partial<IProps>) {
  const {
    defaultContent = [],
    defaultHtml = '',
    defaultConfig = {},
    mode = 'default',
    style = {},
  } = props;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current === null) return;

    createEditor({
      selector: ref.current,
      config: defaultConfig,
      content: defaultContent,
      html: defaultHtml,
      mode,
    });
  }, []);

  return <div style={style} ref={ref}></div>;
}

export default EditorComponent;
