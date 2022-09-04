import React, { useEffect, useRef } from 'react';
import Modal from '@src/components/modal/modal';
import classNames from 'classnames/bind';
import styles from './place-detail-modal.module.scss';
import {
  GetPlaceCommentListQuery,
  GetPlaceCommentListQueryVariables,
  useGetPlaceCommentListLazyQuery,
  useGetPlaceLazyQuery,
} from '@src/generated/graphql';
import PlaceCard from '@src/components/place/place-card';
import { useApolloClient } from '@apollo/client';
import PlaceComment from '@src/components/place/place-comment';
import LoadingBlock from '@src/components/common/loading/loading-block';
import { COMMENT_LIMIT } from '@src/constants/place';
import { GET_PLACE_COMMENT_LIST_QUERY } from '@src/graphql/place/get-place-comment-list';

const cx = classNames.bind(styles);

interface Props {
  visible: boolean;
  placeId: number;
  onClose: () => void;
}

function PlaceDetailModal({ visible, placeId, onClose }: Props) {
  const apollo = useApolloClient();
  const [getPlaceQuery, { data, loading }] = useGetPlaceLazyQuery();
  const [getPlaceCommentListQuery, { data: commentData, fetchMore: fetchMoreComments }] =
    useGetPlaceCommentListLazyQuery();
  const commentInputRef = useRef<HTMLInputElement>(null);
  const place = data?.getPlace;
  const comments = commentData?.getPlaceCommentList;

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
    if (!comments) return;

    const { data } = await fetchMoreComments({
      variables: {
        input: {
          placeId,
          sinceId: comments.items[comments.items.length - 1].id,
          offset: 1,
          limit: COMMENT_LIMIT,
        },
      },
    });

    apollo.writeQuery<GetPlaceCommentListQuery, GetPlaceCommentListQueryVariables>({
      query: GET_PLACE_COMMENT_LIST_QUERY,
      variables: { input: { placeId, limit: COMMENT_LIMIT } },
      data: {
        getPlaceCommentList: {
          ...data.getPlaceCommentList,
          items: [...comments.items, ...data.getPlaceCommentList.items],
        },
      },
    });
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
          total={comments.total}
          comments={comments.items}
          commentInputRef={commentInputRef}
          onClickMore={handleClickMore}
        />
      )}
    </Modal>
  );
}

export default PlaceDetailModal;
