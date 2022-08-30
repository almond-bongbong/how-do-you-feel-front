import React from 'react';
import classNames from 'classnames/bind';
import styles from './loading-block.module.scss';
import { faSpinner } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

interface Props {
  height?: number;
}

function LoadingBlock({ height }: Props) {
  return (
    <div className={cx('loading')} style={{ height }}>
      로딩중
      <FontAwesomeIcon icon={faSpinner} spinPulse />
    </div>
  );
}

export default LoadingBlock;
