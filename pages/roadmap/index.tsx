import React from 'react';
import Layout from '@src/components/layout/layout';
import RoadmapList from '@src/components/roadmap/roadmap-list';

function Roadmap() {
  return (
    <Layout title="우리의 로드맵">
      <RoadmapList
        items={[
          {
            title: '모바일, 태블릿 해상도 지원',
            description: '다양한 디바이스에서 이용하실 수 있도록 지원할 계획입니다.',
            targetDate: '2022 3Q',
            isDone: false,
          },
          {
            title: '지도뷰',
            description: '저장된 게시물을 지로뷰로 확인할 수 있습니다.',
            targetDate: '2022 4Q',
            isDone: false,
          },
          {
            title: '게시물 비공개',
            description: '게시물을 비공개로 설정할 수 있습니다.',
            targetDate: '2022 3Q',
            isDone: false,
          },
          {
            title: '북마크 기능 추가',
            description: '마음에 드는 게시물을 저장할 수 있습니다.',
            targetDate: '2022 3Q',
            isDone: true,
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
