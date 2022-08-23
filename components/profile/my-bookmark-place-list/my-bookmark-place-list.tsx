import React from 'react';
import classNames from 'classnames/bind';
import styles from './my-bookmark-place-list.module.scss';
import { useGetPlaceListQuery } from '@src/generated/graphql';
import PlaceGallery from '@src/components/place/place-gallery';

const cx = classNames.bind(styles);

interface Props {
  accountId: string;
}

function MyBookmarkPlaceList({ accountId }: Props) {
  const { data, loading } = useGetPlaceListQuery({
    skip: !accountId,
    variables: {
      input: {
        bookmarkedAccountId: accountId,
      },
    },
  });

  return (
    <div className={cx('container')}>
      {loading ? (
        <div className={cx('loading')}>불러오는중</div>
      ) : (
        <PlaceGallery
          placeList={
            data?.getPlaceList.items.map((item) => {
              const [firstImage] = item.images || [];
              const [sido, sigungu] = item.address?.split(' ') || [];
              return {
                id: item.id,
                thumbnailUrl: firstImage?.url,
                city: [sido, sigungu].filter(Boolean).join(' '),
              };
            }) || []
          }
        />
      )}
    </div>
  );
}

export default MyBookmarkPlaceList;
