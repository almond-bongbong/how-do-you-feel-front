import React from 'react';
import { HelloQuery } from '../generated/graphql';
import { getApolloClient } from '../apollo/client';
import { HELLO_QUERY } from '../graphql/hello';
import { InferGetServerSidePropsType, NextPageContext } from 'next';
import useInitialApolloClient from '../hooks/apollo/useInitialApolloClient';
import HomeMain from '../components/home/home-main';

function Home({ initialState }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useInitialApolloClient(initialState);

  console.log('render home');

  return <HomeMain />;
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
