import React, { memo, useState, useMemo, FC, useCallback, useEffect } from 'react';
import { Image, Button } from 'antd';
import style from './index.module.scss';
import ImageGallery from '@/ImageGallery';

const Img: FC<FormProps<string | null>> = memo(function Img({ value, onChange }) {
  const [visible, setVisible] = useState<boolean>(false);

  const [url, setUrl] = useState<string | null>(null);

  const acceptCallback = useCallback(
    (val: string) => {
      setUrl(val);
      triggerChange(val);
    },
    [url],
  );
  const remove = () => {
    setUrl(null);
    triggerChange(null);
  };

  const triggerChange = useCallback(
    (changedValue: string | null) => {
      onChange && onChange(changedValue);
    },
    [url],
  );

  const styles = useMemo(() => {
    if (url) {
      return { width: '48%' };
    }
    return { width: '100%' };
  }, [url]);

  useEffect(() => {
    if (value) {
      setUrl(value);
    }
  }, [value]);

  return (
    <div className={style.image}>
      <div className={style.main}>{url ? <Image width={100} src={url} /> : null}</div>
      <div className={style.btn}>
        <Button style={{ ...styles }} onClick={() => setVisible(true)}>
          上传
        </Button>
        {url ? (
          <Button style={{ ...styles }} danger onClick={remove}>
            清除
          </Button>
        ) : null}
      </div>
      <ImageGallery
        visible={visible}
        onCancel={() => setVisible(false)}
        callBack={acceptCallback}
      />
    </div>
  );
});

export default Img;
