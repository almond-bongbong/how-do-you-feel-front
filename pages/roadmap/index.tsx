import React from 'react';
import Layout from '@src/components/layout/layout';
import RoadmapList from '@src/components/roadmap/roadmap-list';
import PageTitle from '@src/components/common/typography/page-title';

function Roadmap() {
  return (
    <Layout>
      <RoadmapList
        items={[
          {
            title: '모바일, 태블릿 해상도 지원',
            description: '다양한 디바이스에서 이용하실 수 있도록 지원할 계획입니다.',
            targetDate: '2022 3Q',
            isDone: false,
          },
          {
            title: '스크랩 기능 추가',
            description:
              '스크랩 기능을 추가하여 스크랩하신 글을 이용하실 수 있도록 지원할 계획입니다.',
            targetDate: '2022 3Q',
            isDone: false,
          },
          {
            title: '글 작성시 이미지 순서 변경',
            description:
              '글 작성시 드래그앤 드랍을 이용하여 선택한 이미지들의 순서를 변경할 수 있습니다.',
            targetDate: '2022 3Q',
            isDone: true,
          },
        ]}
      />
    </Layout>
  );
}

export default Roadmap;
