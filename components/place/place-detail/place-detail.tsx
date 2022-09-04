import React, { useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './place-detail.module.scss';
import PlaceCard from '@src/components/place/place-card';
import PlaceComment from '@src/components/place/place-comment';
import { useRouter } from 'next/router';
import { useGetPlaceQuery } from '@src/generated/graphql';

const cx = classNames.bind(styles);

function PlaceDetail() {
  const router = useRouter();
  const id = Number(router.query.id);
  const commentInputRef = useRef<HTMLInputElement>(null);
  const { data } = useGetPlaceQuery({ variables: { input: { id } } });
  const place = data?.getPlace;

  return (
    <div className={cx('container')}>
      {place && (
        <PlaceCard
          place={place}
          onClickComment={() => commentInputRef.current?.focus()}
          onDelete={() => router.push('/')}
        />
      )}
      {place && <PlaceComment placeId={id} commentInputRef={commentInputRef} />}
    </div>
  );
}

export default PlaceDetail;
