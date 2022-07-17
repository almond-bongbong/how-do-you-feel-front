import axios from 'axios';
import Cookies from 'js-cookie';
import { TOKEN_KEY } from '@src/constants/keys';

export const uploadFile = (file: File) =>
  axios.post(`${process.env.NEXT_PUBLIC_API_URL}/image/upload`, file, {
    headers: {
      Authorization: `Bearer ${Cookies.get(TOKEN_KEY)}`,
    },
  });
