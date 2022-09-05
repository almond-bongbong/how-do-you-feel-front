import React, { useEffect, useRef, useState } from 'react';
import Modal from '@src/components/modal/modal';
import classNames from 'classnames/bind';
import styles from './place-detail-modal.module.scss';
import { GetPlaceQuery, useGetPlaceLazyQuery } from '@src/generated/graphql';
import PlaceCard from '@src/components/place/place-card';
import { useApolloClient } from '@apollo/client';
import PlaceComment from '@src/components/place/place-comment';
import LoadingBlock from '@src/components/common/loading/loading-block';

const cx = classNames.bind(styles);

interface Props {
  visible: boolean;
  placeId?: number;
  onClose: () => void;
}

function PlaceDetailModal({ visible, placeId, onClose }: Props) {
  const apollo = useApolloClient();
  const [getPlaceQuery, { loading }] = useGetPlaceLazyQuery();
  const [place, setPlace] = useState<GetPlaceQuery['getPlace'] | null>(null);
  const commentInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!placeId) return;

    getPlaceQuery({
      variables: { input: { id: placeId } },
    }).then(({ data }) => {
      setPlace(data?.getPlace || null);
    });
  }, [placeId, getPlaceQuery]);

  const onDeletePlace = () => {
    const normalizedPlaceId = apollo.cache.identify({
      __typename: 'Place',
      id: placeId,
    });
    apollo.cache.evict({ id: normalizedPlaceId });
    apollo.cache.gc();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      width={800}
      isEscClosable
      closeButtonClassName={cx('modal_close_button')}
      contentClassName={cx('place_modal')}
      onClose={onClose}
      // onAfterClose={() => setPlace(null)}
    >
      {loading && <LoadingBlock />}
      {place && (
        <PlaceCard
          place={place}
          onDelete={onDeletePlace}
          onClickComment={() => commentInputRef.current?.focus()}
        />
      )}
      {place && <PlaceComment placeId={place.id} commentInputRef={commentInputRef} />}
    </Modal>
  );
}

export default PlaceDetailModal;
