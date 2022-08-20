import React from 'react';
import Layout from '@src/components/layout/layout';
import ProfileBanner from '@src/components/profile/profile-banner';
import useCurrentUser from '@src/hooks/auth/use-current-user';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import cookie from '@src/libs/cookie';
import { TOKEN_KEY } from '@src/constants/keys';
import jwt from '@src/libs/jwt';
import { getApolloClient } from '@src/apollo/client';
import { GET_PROFILE_QUERY } from '@src/graphql/account/get-profile';
import {
  GetProfileQuery,
  GetProfileQueryVariables,
  useGetProfileQuery,
} from '@src/generated/graphql';
import useInitializeApolloClient from '@src/hooks/apollo/use-initialize-apollo-client';

function Profile({ initialState }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useInitializeApolloClient(initialState);
  const { currentUser } = useCurrentUser();
  const { data } = useGetProfileQuery({
    skip: !currentUser,
    variables: { input: { id: currentUser?.id ?? '' } },
  });
  const profile = data?.getProfile;

  if (!profile) return <div>유저 정보를 찾지못했습니다.</div>;

  return (
    <Layout>
      <ProfileBanner
        id={profile.id}
        bannerImage={profile.bannerImage?.url}
        profileImage={profile.profileImage?.url}
        username={profile.username}
        location={profile.location}
        bio={profile.bio}
        followingCount={profile.followingCount}
        followedByCount={profile.followedByCount}
      />
    </Layout>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const parsedCookie = cookie.parse(context.req.headers.cookie || '');
  const token = parsedCookie[TOKEN_KEY];
  const payload = jwt.getPayload(token);

  if (!payload.id) {
    return {
      notFound: true,
      props: { initialState: null },
    };
  }

  const apollo = getApolloClient();
  await apollo.query<GetProfileQuery, GetProfileQueryVariables>({
    query: GET_PROFILE_QUERY,
    variables: {
      input: {
        id: payload.id,
      },
    },
  });

  return {
    props: {
      initialState: apollo.cache.extract(),
    },
  };
};

Profile.isPrivatePage = true;

export default Profile;
