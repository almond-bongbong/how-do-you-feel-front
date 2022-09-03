import React, { useEffect, useRef, useState } from 'react';
import Modal from '@src/components/modal/modal';
import classNames from 'classnames/bind';
import styles from './place-detail-modal.module.scss';
import {
  GetPlaceCommentListQuery,
  useGetPlaceCommentListLazyQuery,
  useGetPlaceLazyQuery,
} from '@src/generated/graphql';
import PlaceCard from '@src/components/place/place-card';
import { useApolloClient } from '@apollo/client';
import PlaceComment from '@src/components/place/place-comment';
import LoadingBlock from '@src/components/common/loading/loading-block';

const cx = classNames.bind(styles);

interface Props {
  visible: boolean;
  placeId: number;
  onClose: () => void;
}

const COMMENT_LIMIT = 2;

function PlaceDetailModal({ visible, placeId, onClose }: Props) {
  const apollo = useApolloClient();
  const [getPlaceQuery, { data, loading }] = useGetPlaceLazyQuery();
  const [getPlaceCommentListQuery, { data: commentData, fetchMore }] =
    useGetPlaceCommentListLazyQuery();
  const commentInputRef = useRef<HTMLInputElement>(null);
  const [moreComments, setMoreComments] = useState<
    GetPlaceCommentListQuery['getPlaceCommentList']['items']
  >([]);
  const place = data?.getPlace;
  const comments = commentData?.getPlaceCommentList.items.concat(moreComments) || [];

  useEffect(() => {
    if (!placeId) return;

    getPlaceQuery({
      variables: { input: { id: placeId } },
    });
    getPlaceCommentListQuery({
      variables: { input: { placeId, limit: COMMENT_LIMIT } },
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

  const handleClickMore = async () => {
    const { data } = await fetchMore({
      variables: {
        input: {
          placeId,
          sinceId: comments[comments.length - 1].id,
          offset: 1,
          limit: COMMENT_LIMIT,
        },
      },
    });
    setMoreComments((prev) => [...prev, ...data.getPlaceCommentList.items]);
  };

  return (
    <Modal
      visible={visible}
      width={800}
      isEscClosable
      closeButtonClassName={cx('modal_close_button')}
      contentClassName={cx('place_modal')}
      onClose={onClose}
    >
      {loading && <LoadingBlock />}
      {place && (
        <PlaceCard
          place={place}
          onDelete={onDeletePlace}
          onClickComment={() => commentInputRef.current?.focus()}
        />
      )}
      {place && comments && (
        <PlaceComment
          placeId={placeId}
          total={commentData?.getPlaceCommentList?.total ?? 0}
          comments={comments}
          commentInputRef={commentInputRef}
          onClickMore={handleClickMore}
        />
      )}
    </Modal>
  );
}

export default PlaceDetailModal;
