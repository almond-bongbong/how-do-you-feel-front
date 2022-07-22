import axios, { AxiosPromise } from 'axios';
import { AddressListResponse } from '@src/types/api';

export const getAddress = (
  keyword: string,
  page = 1,
  size = 30,
): AxiosPromise<AddressListResponse> =>
  axios.get('https://dapi.kakao.com/v2/local/search/address.json', {
    params: {
      query: keyword,
      page,
      size,
      // analyze_type: 'similar',
    },
    headers: {
      Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
    },
  });
