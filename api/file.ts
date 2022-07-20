import axios, { AxiosPromise } from 'axios';
import Cookies from 'js-cookie';
import { TOKEN_KEY } from '@src/constants/keys';
import { UploadFileResponse } from '@src/types/api';

export const uploadFile = (file: File): AxiosPromise<UploadFileResponse> => {
  const form = new FormData();
  form.append('file', file);
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/image/upload`, form, {
    headers: {
      Authorization: `Bearer ${Cookies.get(TOKEN_KEY)}`,
    },
  });
};
