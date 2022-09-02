import React from 'react';
import classNames from 'classnames/bind';
import styles from './loading-block.module.scss';
import { faCircleNotch } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

interface Props {
  height?: number;
}

function LoadingBlock({ height }: Props) {
  return (
    <div className={cx('loading')} style={{ height }}>
      로딩중
      <FontAwesomeIcon icon={faCircleNotch} spin />
    </div>
  );
}

export default LoadingBlock;
