import React from 'react';
import classNames from 'classnames/bind';
import styles from './place-comment-button.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/pro-light-svg-icons';

const cx = classNames.bind(styles);

interface Props {
  commentCount: number;
  onClick?: () => void;
}

function PlaceCommentButton({ commentCount, onClick }: Props) {
  return (
    <button type="button" className={cx('comment')} onClick={onClick}>
      <FontAwesomeIcon icon={faComment} />
      <span className={cx('count')}>{commentCount}</span>
    </button>
  );
}

export default PlaceCommentButton;
