import React, { memo } from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
const PageError = memo(function PageError() {
  const navigate = useNavigate();
  const backs = () => {
    navigate('/');
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="sorry,页面没有找到，请点击下面返回按钮，再试一次"
      extra={
        <Button type="primary" onClick={backs}>
          返回主页
        </Button>
      }
    />
  );
});

export default PageError;
