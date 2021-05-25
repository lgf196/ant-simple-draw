import { requestCode } from '@/utils/varbile';

export type statusCode = requestCode;

export type EventChange<T, K, U> = (
  e: T,
  attrType: K,
  attrKey: keyof U,
) => void;
