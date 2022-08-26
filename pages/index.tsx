import React from 'react';
import { GetPlaceListQuery } from '../generated/graphql';
import { getApolloClient } from '../apollo/client';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Timeline from '../components/home/timeline';
import Layout from '../components/layout/layout';
import { GET_PLACE_LIST_QUERY } from '@src/graphql/place/place-list';

function Home({ placeListData }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout title="최근 게시된 장소">
      <Timeline placeList={placeListData.items} />
    </Layout>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const client = getApolloClient();
  const { data } = await client.query<GetPlaceListQuery>({
    query: GET_PLACE_LIST_QUERY,
    context,
    variables: {
      input: {
        offset: 0,
        limit: 20,
      },
    },
  });

  return {
    props: {
      placeListData: data.getPlaceList,
    },
  };
};

Home.isPrivatePage = true;

export default Home;
