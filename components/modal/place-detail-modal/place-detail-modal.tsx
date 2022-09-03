import React, { useEffect, useRef } from 'react';
import Modal from '@src/components/modal/modal';
import classNames from 'classnames/bind';
import styles from './place-detail-modal.module.scss';
import { useGetPlaceCommentListLazyQuery, useGetPlaceLazyQuery } from '@src/generated/graphql';
import PlaceDetail from '@src/components/place/place-detail';
import { useApolloClient } from '@apollo/client';
import PlaceComment from '@src/components/place/place-comment';
import LoadingScreen from '@src/components/common/loading/loading-screen';

const cx = classNames.bind(styles);

interface Props {
  visible: boolean;
  placeId: number;
  onClose: () => void;
}

function PlaceDetailModal({ visible, placeId, onClose }: Props) {
  const apollo = useApolloClient();
  const [getPlaceQuery, { data, loading }] = useGetPlaceLazyQuery();
  const [getPlaceCommentListQuery, { data: commentData }] = useGetPlaceCommentListLazyQuery();
  const commentInputRef = useRef<HTMLInputElement>(null);
  const place = data?.getPlace;
  const comments = commentData?.getPlaceCommentList;

  useEffect(() => {
    if (!placeId) return;

    getPlaceQuery({
      variables: { input: { id: placeId } },
    });
    getPlaceCommentListQuery({
      variables: { input: { placeId } },
    });
  }, [placeId, getPlaceQuery, getPlaceCommentListQuery]);

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
      loading={loading}
      onClose={onClose}
    >
      {place && (
        <PlaceDetail
          place={place}
          onDelete={onDeletePlace}
          onClickComment={() => commentInputRef.current?.focus()}
        />
      )}
      {place && comments && (
        <PlaceComment
          placeId={placeId}
          total={comments.total}
          comments={comments.items}
          commentInputRef={commentInputRef}
        />
      )}
    </Modal>
  );
}

export default PlaceDetailModal;
