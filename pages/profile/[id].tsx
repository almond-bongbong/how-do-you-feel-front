import React from 'react';
import Layout from '@src/components/layout/layout';
import ProfileBanner from '@src/components/profile/profile-banner';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getApolloClient } from '@src/apollo/client';
import { GET_PROFILE_QUERY } from '@src/graphql/account/get-profile';
import type { GetProfileQuery, GetProfileQueryVariables } from '@src/generated/graphql';
import { useGetProfileQuery } from '@src/generated/graphql';
import useInitializeApolloClient from '@src/hooks/apollo/use-initialize-apollo-client';
import { useRouter } from 'next/router';
import ProfileTimeline from '@src/components/profile/profile-timeline';

function ProfileDetail({ initialState }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useInitializeApolloClient(initialState);
  const { query } = useRouter();
  const { data } = useGetProfileQuery({
    variables: {
      input: { id: query.id as string },
    },
  });

  const profile = data?.getProfile;
  if (!profile) return <div>loading</div>;

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
        isFollowed={profile.isFollowed}
      />
      <ProfileTimeline />
    </Layout>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { params } = context;
  if (!params?.id || typeof params.id !== 'string') {
    return {
      notFound: true,
      props: {
        initialState: null,
      },
    };
  }

  const apollo = getApolloClient();
  await apollo.query<GetProfileQuery, GetProfileQueryVariables>({
    query: GET_PROFILE_QUERY,
    context,
    variables: {
      input: {
        id: params.id,
      },
    },
  });

  return {
    props: {
      initialState: apollo.cache.extract(),
    },
  };
};

export default ProfileDetail;
