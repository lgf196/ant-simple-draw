import React, { memo, useState, useRef, useEffect, FC } from 'react';
import style from '../index.module.scss';
export interface CustomizeInputType {
  attr: string | number;
  title: string;
  callBack?: (e: string | number) => void;
}
const CustomizeInput: FC<CustomizeInputType> = memo(function CustomizeInput({
  attr,
  title,
  callBack,
}) {
  const [val, setVal] = useState<string | number>('');
  const [isShowInput, setIsShowInput] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const change: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setVal(e.target.value);
    callBack && callBack(e.target.value);
  };
  const blur = async () => {
    setIsShowInput(false);
    callBack && callBack(val);
  };
  useEffect(() => {
    setVal(attr);
  }, [attr]);

  const showInput = () => {
    setIsShowInput(true);
    setTimeout(() => {
      inputRef.current!.focus();
    }, 100);
  };
  return (
    <div className={style.customizeInput}>
      <label>{title}</label>
      <div className={style.toggle}>
        {!isShowInput ? (
          <h2 title="点击编辑" onClick={showInput}>
            {attr}
          </h2>
        ) : (
          <input value={val} onChange={change} onBlur={blur} ref={inputRef} />
        )}
      </div>
    </div>
  );
});

export default CustomizeInput;
