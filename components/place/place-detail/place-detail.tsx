import React, { useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './place-detail.module.scss';
import PlaceCard from '@src/components/place/place-card';
import PlaceComment from '@src/components/place/place-comment';
import { GetPlaceQuery } from '@src/generated/graphql';
import { useRouter } from 'next/router';

const cx = classNames.bind(styles);

interface Props {
  place: GetPlaceQuery['getPlace'];
}

function PlaceDetail({ place }: Props) {
  const router = useRouter();
  const commentInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={cx('container')}>
      {place && (
        <PlaceCard
          place={place}
          onClickComment={() => commentInputRef.current?.focus()}
          onDelete={() => router.push('/')}
        />
      )}
      {place && <PlaceComment placeId={place.id} commentInputRef={commentInputRef} />}
    </div>
  );
}

export default PlaceDetail;
