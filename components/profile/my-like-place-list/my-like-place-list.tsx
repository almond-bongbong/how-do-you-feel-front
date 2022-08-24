import React from 'react';
import classNames from 'classnames/bind';
import styles from './my-like-place-list.module.scss';
import { useGetMyLikePlaceListQuery } from '@src/generated/graphql';
import PlaceLikeInfo from '@src/components/place/place-like-info';

const cx = classNames.bind(styles);

interface Props {
  accountId: string;
}

function MyLikePlaceList({ accountId }: Props) {
  const { data, loading } = useGetMyLikePlaceListQuery({
    skip: !accountId,
    variables: {
      input: {},
    },
  });

  return (
    <div className={cx('container')}>
      {loading && <div className={cx('loading')}>불러오는중</div>}
      {data?.getMyLikePlaceList.items.map((place) => (
        <PlaceLikeInfo key={place.id} />
      ))}
    </div>
  );
}

export default MyLikePlaceList;
