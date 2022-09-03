import React from 'react';
import { useGetPlaceListQuery } from '@src/generated/graphql';
import PlaceListItem from '@src/components/place/place-list-item';
import classNames from 'classnames/bind';
import styles from './my-place-list.module.scss';
import LoadingBlock from '@src/components/common/loading/loading-block';

const cx = classNames.bind(styles);

interface Props {
  accountId: string;
}

function MyPlaceList({ accountId }: Props) {
  const { data, loading } = useGetPlaceListQuery({
    variables: {
      input: {
        accountId,
      },
    },
  });

  return (
    <div className={cx('container')}>
      {loading && <LoadingBlock />}
      {data?.getPlaceList.items.map((place) => (
        <PlaceListItem key={place.id} place={place} />
      ))}
    </div>
  );
}

export default MyPlaceList;
