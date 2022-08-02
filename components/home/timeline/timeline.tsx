import React from 'react';
import classNames from 'classnames/bind';
import styles from './timeline.module.scss';
import { useGetPlaceListQuery } from '@src/generated/graphql';
import Place from '@src/components/home/place';

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

  console.log(data?.getPlaceList);

  return (
    <div className={cx('timeline')}>
      {data?.getPlaceList?.items.map((place) => (
        <Place
          key={place.id}
          profileImage={place.account.profileImage?.url}
          username={place.account.username}
          content={place.content}
        />
      ))}
    </div>
  );
}

export default Timeline;
