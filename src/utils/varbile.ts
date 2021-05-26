/**
 * @description 状态码
 */
export enum requestCode {
  failedCode = 111, // 失败
  successCode = '000', // 成功
  noLoginTokenCode = 202, // 无token
  noRouterCode = 404, // 路劲找不到
  serverErrorCode = 500, // 服务错误
}

export const uploadImageFormat = (
  url: string = 'http://blog.lgf196.top/ant-simple-pro-document/logon.png',
) => {
  return [
    {
      uid: Math.random() * 1000,
      status: 'success',
      response: {
        code: requestCode.successCode,
        data: { url },
      },
      url,
    },
  ];
};
