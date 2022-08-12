import React from 'react';
import classNames from 'classnames/bind';
import styles from './my-like-place-list.module.scss';
import Place from '@src/components/place/place';
import { useGetPlaceListQuery } from '@src/generated/graphql';

const cx = classNames.bind(styles);

interface Props {
  accountId: string;
}

function MyLikePlaceList({ accountId }: Props) {
  const { data, loading } = useGetPlaceListQuery({
    skip: !accountId,
    variables: {
      input: {
        likedAccountId: accountId,
      },
    },
  });

  return (
    <div className={cx('container')}>
      {loading && <div className={cx('loading')}>불러오는중</div>}
      {data?.getPlaceList.items.map((place) => (
        <Place key={place.id} place={place} />
      ))}
    </div>
  );
}

export default MyLikePlaceList;
