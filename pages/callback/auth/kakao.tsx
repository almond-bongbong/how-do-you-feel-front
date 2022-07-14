import React, { ReactElement, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getKakaoToken } from '../../../api/auth';
import { AUTH_STATE_KEY, TOKEN_KEY } from '../../../constants/keys';
import { getOriginByRequest } from '../../../libs/url';
import { useSignInMutation } from '../../../generated/graphql';
import alertModal from '../../../components/common/modal/alert-modal';
import { ApolloError } from '@apollo/client';
import Cookies from 'js-cookie';

function Kakao({ token }: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement {
  const router = useRouter();
  const [signInMutation] = useSignInMutation();

  const authKakao = useCallback(async () => {
    const { state } = router.query;
    const myState = sessionStorage.getItem(AUTH_STATE_KEY);

    if (myState !== state || !token) {
      await alertModal('잘못된 접근입니다.');
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
      if (!data) return alertModal('로그인에 실패했습니다.');
      Cookies.set(TOKEN_KEY, data.signIn.token);
      await router.push('/');
    } catch (error) {
      const message =
        error instanceof ApolloError ? error.message : '알 수 없는 오류가 발생했습니다.';
      await alertModal(message);
    }
  }, [router, token, signInMutation]);

  useEffect(() => {
    authKakao();
  }, [authKakao]);

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
