import React, { memo, useEffect } from 'react';
import E from 'wangeditor';
const WangEditor = memo((props) => {
  useEffect(() => {
    const editor = new E('#richText');
    // 或者 const editor = new E( document.getElementById('div1') )
    editor.config.menus = [
      'head',
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
    editor.config.onchange = changeHandle;
    editor.create();
    () => {
      return editor.destroy();
    };
  }, []);
  const changeHandle = (val: any) => {
    console.log('val', val);
  };
  return (
    <div id="richText">
      <p>
        欢迎使用 <b>wangEditor</b> 富文本编辑器
      </p>
    </div>
  );
});

export default WangEditor;
