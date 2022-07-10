import React, { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { getKakaoToken } from '../../../api/auth';
import { AUTH_STATE_KEY } from '../../../constants/keys';
import { getOriginByRequest } from '../../../libs/url';

interface Props {
  token?: string | null;
}

function Kakao({ token }: Props): ReactElement {
  const router = useRouter();

  useEffect(() => {
    const { state } = router.query;
    const myState = sessionStorage.getItem(AUTH_STATE_KEY);

    if (myState !== state || !token) {
      console.log('잘못된 접근');
      router.replace('/');
      return;
    }

    console.log(token);
  }, [router, token]);

  return <div>카카오 연결중입니다</div>;
}

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  let token = null;

  if (typeof query.code === 'string') {
    try {
      const { data } = await getKakaoToken(query.code, {
        origin: getOriginByRequest(req),
      });
      token = data.access_token;
    } catch (error) {
      console.log('Get token for kakao failure');
    }
  }

  return {
    props: {
      token,
    },
  };
};

export default Kakao;
