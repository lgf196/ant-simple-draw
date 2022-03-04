import React, { FC, memo, useEffect, useState } from 'react';
import '@wangeditor/editor/dist/css/style.css';
import { IEditorConfig, IDomEditor } from '@wangeditor/editor';
import EditorComponent from './Editor';
import ToolbarComponent from './Toolbar';

const WangEditor: FC<FormProps<string>> = memo(({ value, onChange }) => {
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  const [val, setVal] = useState<string | undefined>(value);

  const toolbarConfig = {
    excludeKeys: ['group-image', 'insertTable', 'bulletedList', 'numberedList', 'group-video'],
  };

  const editorConfig: Partial<IEditorConfig> = {};
  editorConfig.placeholder = '请输入内容...';
  editorConfig.hoverbarKeys = {
    text: {
      menuKeys: ['insertLink', 'bold', 'through', 'clearStyle'],
    },
  };

  editorConfig.onCreated = (editor: IDomEditor) => {
    setEditor(editor);
  };
  editorConfig.onChange = (editor: IDomEditor) => {
    !editor.isEmpty() && triggerChange(editor.getHtml());
  };

  const triggerChange = (changedValue: string) => {
    onChange && onChange(changedValue);
  };
  useEffect(() => {
    if (value) {
      setVal(value);
    }
  }, [value]);

  useEffect(() => {
    // 组件销毁时，销毁 editor
    return () => {
      if (editor === null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <div style={{ zIndex: 1000 }}>
      <ToolbarComponent
        editor={editor}
        defaultConfig={toolbarConfig}
        style={{ border: '1px solid #d9d9d9' }}
      />
      <EditorComponent
        defaultConfig={editorConfig}
        defaultHtml={val}
        mode="default"
        style={{ border: '1px solid #d9d9d9', marginTop: '10px' }}
      />
    </div>
  );
});

export default WangEditor;
