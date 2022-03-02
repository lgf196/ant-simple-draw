import React, { FC, memo, useEffect, useRef } from 'react';
import E from 'wangeditor';
export interface WangEditorType {
  value?: string;
  onChange?: (val: Partial<string>) => void;
}
const WangEditor: FC<WangEditorType> = memo(({ value, onChange }) => {
  const editor = useRef<E>();
  useEffect(() => {
    editor.current = new E('#richText');
    editor.current.config.menus = [
      'foreColor',
      'backColor',
      'fontSize',
      'bold',
      'fontName',
      'italic',
      'link',
      'underline',
      'strikeThrough',
      'lineHeight',
      'list',
      'todo',
      'justify',
      'quote',
      'emoticon',
      'code',
      'splitLine',
      'undo',
      'redo',
    ];
    editor.current.config.onchange = triggerChange;
    editor.current.create();
    () => {
      return editor.current && editor.current.destroy();
    };
  }, []);

  const triggerChange = (changedValue: string) => {
    onChange && onChange(changedValue);
  };

  useEffect(() => {
    if (value) {
      if (editor.current) {
        editor.current.txt.html(value);
      }
    }
  }, [value]);
  return <div id="richText"></div>;
});

export default WangEditor;
