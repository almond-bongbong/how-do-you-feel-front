import React from 'react';
import classNames from 'classnames/bind';
import styles from './loading-block.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/pro-solid-svg-icons';

const cx = classNames.bind(styles);

interface Props {
  height?: number;
}

function LoadingBlock({ height }: Props) {
  return (
    <div className={cx('loading')} style={{ height }}>
      로딩중
      <FontAwesomeIcon icon={faSpinner} spin />
    </div>
  );
}

export default LoadingBlock;
