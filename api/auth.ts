import axios, { AxiosPromise } from 'axios';

export const getKakaoToken = (code: string, options: { origin: string }): AxiosPromise =>
  axios.post('https://kauth.kakao.com/oauth/token', null, {
    params: {
      grant_type: 'authorization_code',
      client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
      redirect_uri: `${options.origin}${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_PATH}`,
      code,
      client_secret: process.env.KAKAO_CLIENT_SECRET,
    },
  });
