import React from 'react';
import Layout from '@src/components/layout/layout';
import ProfileBanner from '@src/components/profile/profile-banner';
import { GetServerSidePropsContext } from 'next';
import { getApolloClient } from '@src/apollo/client';
import { GET_PROFILE_QUERY } from '@src/graphql/account/get-profile';
import type { GetProfileQuery, GetProfileQueryVariables } from '@src/generated/graphql';
import { useGetProfileQuery } from '@src/generated/graphql';
import { useRouter } from 'next/router';
import ProfileTimeline from '@src/components/profile/profile-timeline';

function ProfileDetail() {
  const { query } = useRouter();
  const accountId = query.id as string;
  const selectedTab = query.tab as string;
  const { data } = useGetProfileQuery({
    fetchPolicy: 'cache-first',
    variables: { input: { id: accountId } },
  });
  const profile = data?.getProfile;

  if (!profile) return <div>loading</div>;
  if (!accountId) return <div>잘못된 접근입니다.</div>;

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

      <ProfileTimeline accountId={accountId} selectedTab={selectedTab} />
    </Layout>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { params } = context;
  const accountId = params?.id as string;

  if (!accountId) {
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
        id: accountId,
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
