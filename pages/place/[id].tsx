import React from 'react';
import { GET_PLACE_QUERY } from '@src/graphql/place/get-place';
import { getApolloClient } from '@src/apollo/client';
import { GetServerSidePropsContext } from 'next';
import { GetPlaceQuery, GetPlaceQueryVariables } from '@src/generated/graphql';
import Layout from '@src/components/layout/layout';
import PlaceDetail from '@src/components/place/place-detail';

function Place() {
  return (
    <Layout hasPrevButton>
      <PlaceDetail />
    </Layout>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext<{ id: string }>) => {
  const apollo = getApolloClient();
  const id = context.params?.id;
  if (!id) return { notFound: true, props: { initialState: null } };

  await apollo.query<GetPlaceQuery, GetPlaceQueryVariables>({
    query: GET_PLACE_QUERY,
    variables: { input: { id: Number(id) } },
  });

  return {
    props: {
      initialState: apollo.cache.extract(),
    },
  };
};

export default Place;
