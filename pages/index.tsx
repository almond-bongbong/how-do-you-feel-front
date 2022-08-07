import React from 'react';
import { GetPlaceListQuery } from '../generated/graphql';
import { getApolloClient } from '../apollo/client';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import useInitializeApolloClient from '../hooks/apollo/use-initialize-apollo-client';
import Timeline from '../components/home/timeline';
import Layout from '../components/layout/layout';
import { GET_PLACE_LIST_QUERY } from '@src/graphql/place/place-list';

function Home({ initialState }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useInitializeApolloClient(initialState);

  return (
    <Layout>
      <Timeline />
    </Layout>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const client = getApolloClient();
  await client.query<GetPlaceListQuery>({
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
      initialState: client.cache.extract(),
    },
  };
};

Home.isPrivatePage = true;

export default Home;
