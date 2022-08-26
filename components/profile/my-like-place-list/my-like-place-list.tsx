import React from 'react';
import classNames from 'classnames/bind';
import styles from './my-like-place-list.module.scss';
import PlaceLikeInfo from '@src/components/place/place-like-info';
import { useGetMyLikePlaceListQuery } from '@src/generated/graphql';

const cx = classNames.bind(styles);

function MyLikePlaceList() {
  const { data, loading } = useGetMyLikePlaceListQuery({
    variables: {
      input: {},
    },
  });

  return (
    <div className={cx('container')}>
      {loading && <div className={cx('loading')}>불러오는중</div>}
      {data?.getMyLikePlaceList.items.map((place) => (
        <PlaceLikeInfo
          key={place.id}
          id={place.id}
          profileUrl={place.account.profileImage?.url}
          username={place.account.username}
          content={place.content}
          location={place.address || ''}
          likedAt={place.likedAt}
        />
      ))}
    </div>
  );
}

export default MyLikePlaceList;
