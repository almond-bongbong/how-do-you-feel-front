import React, { useEffect } from 'react';
import Modal from '@src/components/modal/modal';
import classNames from 'classnames/bind';
import styles from './place-detail-modal.module.scss';
import { useGetPlaceLazyQuery } from '@src/generated/graphql';
import PlaceDetail from '@src/components/place/place-detail';
import { useApolloClient } from '@apollo/client';

const cx = classNames.bind(styles);

interface Props {
  visible: boolean;
  placeId: number;
  onClose: () => void;
}

function PlaceDetailModal({ visible, placeId, onClose }: Props) {
  const apollo = useApolloClient();
  const [getPlaceQuery, { data, loading }] = useGetPlaceLazyQuery();
  const place = data?.getPlace;

  useEffect(() => {
    if (!placeId) return;
    getPlaceQuery({
      variables: { input: { id: placeId } },
    });
  }, [placeId, getPlaceQuery]);

  const handleDeletePlace = () => {
    const normalizedPlaceId = apollo.cache.identify({
      __typename: 'PlaceDto',
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
      loading={loading}
      onClose={onClose}
    >
      {place && <PlaceDetail place={place} onDelete={handleDeletePlace} />}
    </Modal>
  );
}

export default PlaceDetailModal;
