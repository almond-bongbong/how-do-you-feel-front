import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as fullBookmark } from '@fortawesome/pro-solid-svg-icons';
import { faBookmark as emptyBookmark } from '@fortawesome/pro-light-svg-icons';
import classNames from 'classnames/bind';
import styles from './place-bookmark-button.module.scss';
import { useTogglePlaceBookmarkMutation } from '@src/generated/graphql';

const cx = classNames.bind(styles);

interface Props {
  placeId: number;
  isBookmarked: boolean;
  bookmarkCount: number;
}

function PlaceBookmarkButton({ placeId, isBookmarked, bookmarkCount }: Props) {
  const [animateBookmarkButton, setAnimateBookmarkButton] = useState(false);
  const [togglePlaceBookmarkMutation] = useTogglePlaceBookmarkMutation();

  const handleClickBookmark = async () => {
    await togglePlaceBookmarkMutation({
      variables: {
        input: {
          placeId,
        },
      },
      optimisticResponse: {
        togglePlaceBookmark: {
          isBookmarked: !isBookmarked,
        },
      },
      update: (cache, result) => {
        if (!result.data?.togglePlaceBookmark) return;
        const newIsBookmarked = result.data?.togglePlaceBookmark.isBookmarked;

        setAnimateBookmarkButton(newIsBookmarked);
        cache.modify({
          id: cache.identify({
            __typename: 'Place',
            id: placeId,
          }),
          fields: {
            isBookmarked: () => newIsBookmarked,
            bookmarkCount: (prev) => (newIsBookmarked ? prev + 1 : prev - 1),
          },
        });
      },
    });
  };

  return (
    <button
      className={cx('bookmark', {
        active: isBookmarked,
        animate: animateBookmarkButton,
      })}
      onClick={handleClickBookmark}
    >
      <FontAwesomeIcon icon={isBookmarked ? fullBookmark : emptyBookmark} />
      <span className={cx('count')}>{bookmarkCount}</span>
    </button>
  );
}

export default PlaceBookmarkButton;
