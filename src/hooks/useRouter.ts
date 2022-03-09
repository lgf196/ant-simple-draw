import { useMemo } from 'react';
import { useParams, useLocation, useNavigate, To } from 'react-router-dom';
import queryString from 'query-string';

/**
 * @author lgf
 * @description 对router的封装操作
 */

const useRouter = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const replace = (to: To) => {
    navigate(to, { replace: true });
  };
  return useMemo(() => {
    return {
      push: navigate,
      back: navigate(-1),
      replace,
      pathname: location.pathname,
      // 获取地址栏的参数，将字符串转为json
      // 例如: /:topic?sort=popular -> { topic: "react", sort: "popular" }
      query: {
        ...queryString.parse(location.search),
        ...params,
      },
      location,
    };
  }, [params, location]);
};

export default useRouter;
