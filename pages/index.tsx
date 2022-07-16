import React from 'react';
import { HelloQuery } from '../generated/graphql';
import { getApolloClient } from '../apollo/client';
import { HELLO_QUERY } from '../graphql/hello';
import { InferGetServerSidePropsType, NextPageContext } from 'next';
import useInitializeApolloClient from '../hooks/apollo/use-initialize-apollo-client';
import Timeline from '../components/home/timeline';
import Layout from '../components/layout/layout';

function Home({ initialState }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useInitializeApolloClient(initialState);

  return (
    <Layout>
      <Timeline />
    </Layout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const client = getApolloClient();
  const { data } = await client.query<HelloQuery>({ query: HELLO_QUERY, context });

  if (!data.hello) return { notFound: true };

  return {
    props: {
      initialState: client.cache.extract(),
    },
  };
}

Home.isPrivatePage = true;

export default Home;
