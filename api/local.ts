import axios, { AxiosPromise } from 'axios';
import { AddressByKeywordListResponse } from '@src/types/api';

export const getAddressByKeyword = (
  keyword: string,
  page = 1,
  size = 15,
): AxiosPromise<AddressByKeywordListResponse> =>
  axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
    params: {
      query: keyword,
      page,
      size,
    },
    headers: {
      Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
    },
  });
