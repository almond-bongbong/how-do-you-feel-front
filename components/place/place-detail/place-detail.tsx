import React from 'react';
import classNames from 'classnames/bind';
import styles from './place-detail.module.scss';
import PlaceCard from '@src/components/place/place-card';
import PlaceComment from '@src/components/place/place-comment';
import { useRouter } from 'next/router';
import { useGetPlaceCommentListQuery, useGetPlaceQuery } from '@src/generated/graphql';

const cx = classNames.bind(styles);

function PlaceDetail() {
  const router = useRouter();
  const id = Number(router.query.id);
  const { data } = useGetPlaceQuery({ variables: { input: { id } } });
  const { data: commentData } = useGetPlaceCommentListQuery({
    variables: { input: { placeId: id } },
  });
  const place = data?.getPlace;
  const comments = commentData?.getPlaceCommentList;

  return (
    <div className={cx('container')}>
      {place && <PlaceCard place={place} />}
      {place && comments && (
        <PlaceComment placeId={id} total={comments.total} comments={comments.items} />
      )}
    </div>
  );
}

export default PlaceDetail;
