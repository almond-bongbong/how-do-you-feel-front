import React, { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { ApolloError } from '@apollo/client';
import Cookies from 'js-cookie';
import { useSignInMutation } from '@src/generated/graphql';
import { AUTH_STATE_KEY, TOKEN_KEY } from '@src/constants/keys';
import Modal from '@src/components/modal/modal';
import { getKakaoToken } from '@src/api/auth';
import { getOriginByRequest } from '@src/libs/url';

function Kakao({ token }: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement {
  const router = useRouter();
  const [signInMutation] = useSignInMutation();

  useEffect(() => {
    (async () => {
      const { state } = router.query;
      const myState = sessionStorage.getItem(AUTH_STATE_KEY);

      if (myState !== state || !token) {
        await Modal.alert('잘못된 접근입니다.');
        return router.replace('/');
      }

      try {
        const { data } = await signInMutation({
          variables: {
            input: {
              platform: 'KAKAO',
              platformAccessToken: token,
            },
          },
        });
        if (!data) return Modal.alert('로그인에 실패했습니다.');
        Cookies.set(TOKEN_KEY, data.signIn.token);
        router.push('/');
      } catch (error) {
        const message =
          error instanceof ApolloError ? error.message : '알 수 없는 오류가 발생했습니다.';
        await Modal.alert(message);
      }
    })();
  }, [router, token, signInMutation]);

  return <div>카카오 연결중입니다</div>;
}

export const getServerSideProps = async ({ query, req }: GetServerSidePropsContext) => {
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
    props: { token },
  };
};

export default Kakao;
