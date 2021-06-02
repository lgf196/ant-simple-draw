/**
 * @description 状态码
 */
export enum requestCode {
  failedCode = 111,
  successCode = '000',
  noLoginTokenCode = 202,
  noRouterCode = 404,
  serverErrorCode = 500,
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
