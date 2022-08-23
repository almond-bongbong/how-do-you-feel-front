import React from 'react';
import classNames from 'classnames/bind';
import styles from './my-like-place-list.module.scss';
import { useGetMyLikePlaceListQuery } from '@src/generated/graphql';

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
        <div key={place.id}>{place.id}</div>
      ))}
    </div>
  );
}

export default MyLikePlaceList;
