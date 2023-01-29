import { SerializedError } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

export const convertToSerializedError = (error: AxiosError): SerializedError => {
  const { stack, response } = error;

  const { status, statusText, data } = response ?? {};

  return {
    code: `${status}`,
    name: statusText,
    stack,
    message: JSON.stringify(data)
  };
};
