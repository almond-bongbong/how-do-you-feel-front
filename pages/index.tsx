import React from 'react';
import { useGetPlaceListQuery } from '../generated/graphql';
import Timeline from '../components/home/timeline';
import Layout from '../components/layout/layout';

function Home() {
  const { data } = useGetPlaceListQuery({
    variables: {
      input: {
        offset: 0,
        limit: 20,
      },
    },
  });

  return (
    <Layout title="최근 게시된 장소">
      <Timeline placeList={data?.getPlaceList.items || []} />
    </Layout>
  );
}

Home.isPrivatePage = true;

export default Home;
