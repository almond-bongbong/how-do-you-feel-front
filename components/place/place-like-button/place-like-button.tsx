import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fullHeart } from '@fortawesome/pro-solid-svg-icons';
import { faHeart as emptyHeart } from '@fortawesome/pro-light-svg-icons';
import classNames from 'classnames/bind';
import styles from './place-like-button.module.scss';
import { useTogglePlaceLikeMutation } from '@src/generated/graphql';
import { useApolloClient } from '@apollo/client';

const cx = classNames.bind(styles);

interface Props {
  placeId: number;
  isLiked: boolean;
  likeCount: number;
}

function PlaceLikeButton({ placeId, isLiked, likeCount }: Props) {
  const [togglePlaceLikeMutation] = useTogglePlaceLikeMutation();
  const [animateLikeButton, setAnimateLikeButton] = useState(false);
  const apollo = useApolloClient();

  const handleClickLike = async () => {
    await togglePlaceLikeMutation({
      variables: {
        input: {
          placeId,
        },
      },
      optimisticResponse: {
        togglePlaceLike: {
          isLiked: !isLiked,
        },
      },
      update: (cache, result) => {
        if (!result.data?.togglePlaceLike) return;
        const newIsLiked = result.data?.togglePlaceLike.isLiked;

        setAnimateLikeButton(newIsLiked);
        apollo.cache.modify({
          id: cache.identify({
            __typename: 'Place',
            id: placeId,
          }),
          fields: {
            isLiked: () => newIsLiked,
            likeCount: (prev) => (newIsLiked ? prev + 1 : prev - 1),
          },
        });
      },
    });
  };

  return (
    <button
      className={cx('like', { active: isLiked, animate: animateLikeButton })}
      onClick={handleClickLike}
    >
      <FontAwesomeIcon icon={isLiked ? fullHeart : emptyHeart} />
      <span className={cx('count')}>{likeCount}</span>
    </button>
  );
}

export default PlaceLikeButton;
