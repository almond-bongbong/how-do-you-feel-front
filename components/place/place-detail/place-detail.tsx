import React, { useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './place-detail.module.scss';
import PlaceCard from '@src/components/place/place-card';
import PlaceComment from '@src/components/place/place-comment';
import { useRouter } from 'next/router';
import {
  GetPlaceCommentListQuery,
  GetPlaceCommentListQueryVariables,
  useGetPlaceCommentListQuery,
  useGetPlaceQuery,
} from '@src/generated/graphql';
import { COMMENT_LIMIT } from '@src/constants/place';
import { useApolloClient } from '@apollo/client';
import { GET_PLACE_COMMENT_LIST_QUERY } from '@src/graphql/place/get-place-comment-list';

const cx = classNames.bind(styles);

function PlaceDetail() {
  const apollo = useApolloClient();
  const router = useRouter();
  const id = Number(router.query.id);
  const commentInputRef = useRef<HTMLInputElement>(null);
  const { data } = useGetPlaceQuery({ variables: { input: { id } } });
  const { data: commentData, fetchMore: fetchMoreComments } = useGetPlaceCommentListQuery({
    variables: { input: { placeId: id, limit: COMMENT_LIMIT } },
  });
  const place = data?.getPlace;
  const comments = commentData?.getPlaceCommentList;

  const handleClickMore = async () => {
    if (!comments) return;

    const { data } = await fetchMoreComments({
      variables: {
        input: {
          placeId: id,
          sinceId: comments.items[comments.items.length - 1].id,
          offset: 1,
          limit: COMMENT_LIMIT,
        },
      },
    });

    apollo.writeQuery<GetPlaceCommentListQuery, GetPlaceCommentListQueryVariables>({
      query: GET_PLACE_COMMENT_LIST_QUERY,
      variables: { input: { placeId: id, limit: COMMENT_LIMIT } },
      data: {
        getPlaceCommentList: {
          ...data.getPlaceCommentList,
          items: [...comments.items, ...data.getPlaceCommentList.items],
        },
      },
    });
  };

  return (
    <div className={cx('container')}>
      {place && <PlaceCard place={place} onClickComment={() => commentInputRef.current?.focus()} />}
      {place && comments && (
        <PlaceComment
          placeId={id}
          total={comments.total}
          comments={comments.items}
          commentInputRef={commentInputRef}
          onClickMore={handleClickMore}
        />
      )}
    </div>
  );
}

export default PlaceDetail;
