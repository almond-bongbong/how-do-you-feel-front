import React from 'react';
import classNames from 'classnames/bind';
import styles from './timeline.module.scss';
import { useGetPlaceListQuery } from '@src/generated/graphql';
import Place from '@src/components/place/place';
import PageTitle from '@src/components/common/typography/page-title';

const cx = classNames.bind(styles);

function Timeline() {
  const { data } = useGetPlaceListQuery({
    variables: {
      input: {
        offset: 0,
        limit: 20,
      },
    },
  });

  return (
    <div className={cx('timeline')}>
      <PageTitle>최근 게시된 장소</PageTitle>
      {data?.getPlaceList?.items.map((place) => (
        <Place key={place.id} place={place} />
      ))}
    </div>
  );
}

export default Timeline;
