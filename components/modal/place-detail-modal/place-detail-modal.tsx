import React, { useEffect } from 'react';
import Modal from '@src/components/modal/modal';
import classNames from 'classnames/bind';
import styles from './place-detail-modal.module.scss';
import { useGetPlaceLazyQuery } from '@src/generated/graphql';
import PlaceDetail from '@src/components/common/place/place-detail';

const cx = classNames.bind(styles);

interface Props {
  visible: boolean;
  placeId: number;
  onClose: () => void;
}

function PlaceDetailModal({ visible, placeId, onClose }: Props) {
  const [getPlaceQuery, { data, loading }] = useGetPlaceLazyQuery();
  const place = data?.getPlace;

  useEffect(() => {
    if (!placeId) return;
    getPlaceQuery({
      variables: { input: { id: placeId } },
    });
  }, [placeId, getPlaceQuery]);

  return (
    <Modal
      visible={visible}
      width={800}
      isEscClosable
      closeButtonClassName={cx('modal_close_button')}
      contentClassName={cx('place_modal')}
      onClose={onClose}
    >
      {loading && <div>불러오는중</div>}
      {place && (
        <PlaceDetail
          content={place.content}
          createdAt={place.createdAt}
          account={{
            id: place.account.id,
            username: place.account.username,
            profileUrl: place.account.profileImage?.url,
          }}
          location={place.address}
          lng={place.longitude}
          lat={place.latitude}
          imageUrls={place.images?.map((image) => image.url)}
        />
      )}
    </Modal>
  );
}

export default PlaceDetailModal;
