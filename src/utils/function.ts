import { message } from 'antd';
import { requestCode } from './varbile';
import { statusCode } from '@/interface';

/**
 * @author lgf
 * @param status 状态
 * @param content 弹窗的文本提示语
 */
export const toast = (
  status: statusCode = requestCode.successCode,
  content: string = '操作成功',
): void => {
  if (status === requestCode.successCode) {
    message.success(content);
  } else if (status === requestCode.failedCode) {
    message.error(content);
  }
};
