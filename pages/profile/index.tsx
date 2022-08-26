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
import { GetProfileQuery, GetProfileQueryVariables, useGetProfileQuery } from '@src/generated/graphql';
import useInitializeApolloClient from '@src/hooks/apollo/use-initialize-apollo-client';
import ProfileTimeline from '@src/components/profile/profile-timeline';

function Profile({ initialState }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useInitializeApolloClient(initialState);
  const { currentUser } = useCurrentUser();
  const { data } = useGetProfileQuery({
    skip: !currentUser,
    variables: { input: { id: currentUser?.id ?? '' } },
  });
  const profile = data?.getProfile;

  if (!profile || !currentUser) return <div>정보를 불러오지 못했습니다.</div>;

  return (
    <Layout>
      <ProfileBanner
        id={currentUser.id}
        bannerImage={currentUser.bannerImage?.url}
        profileImage={currentUser.profileImage?.url}
        username={currentUser.username}
        location={currentUser.location}
        bio={currentUser.bio}
        followingCount={profile.followingCount}
        followedByCount={profile.followedByCount}
      />
      <ProfileTimeline accountId={currentUser.id} />
    </Layout>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const parsedCookie = cookie.parse(context.req.headers.cookie || '');
  const token = parsedCookie[TOKEN_KEY];
  const payload = token ? jwt.getPayload(token) : {};

  if (!payload.id) {
    return {
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
