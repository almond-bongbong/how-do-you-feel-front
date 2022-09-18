import React from 'react';
import { GET_PLACE_QUERY } from '@src/graphql/place/get-place';
import { getApolloClient } from '@src/apollo/client';
import { GetServerSidePropsContext } from 'next';
import { GetPlaceQuery, GetPlaceQueryVariables, useGetPlaceQuery } from '@src/generated/graphql';
import Layout from '@src/components/layout/layout';
import PlaceDetail from '@src/components/place/place-detail';
import { useRouter } from 'next/router';

function Place() {
  const router = useRouter();
  const id = Number(router.query.id);
  const { data } = useGetPlaceQuery({ variables: { input: { id } } });
  const place = data?.getPlace;

  if (!place) return null;

  return (
    <Layout hasPrevButton title={place.name}>
      <PlaceDetail place={place} />
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
