import React, { useState } from 'react';
import { HelloQuery, useHelloQuery } from '../generated/graphql';
import { getApolloClient } from '../apollo/client';
import { HELLO_QUERY } from '../graphql/hello';
import { InferGetServerSidePropsType, NextPageContext } from 'next';
import useInitialApolloClient from '../hooks/apollo/useInitialApolloClient';

function Home({ initialState }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useInitialApolloClient(initialState);

  const { data } = useHelloQuery();
  const [count, setCount] = useState(0);

  return <div></div>;
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

Home.isPrivate = true;

export default Home;
