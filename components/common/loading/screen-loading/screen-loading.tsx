import React from 'react';
import classNames from 'classnames/bind';
import styles from './screen-loading.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/pro-solid-svg-icons';

const cx = classNames.bind(styles);

function ScreenLoading() {
  return (
    <div className={cx('loading')}>
      로딩중
      <FontAwesomeIcon icon={faSpinner} spinPulse />
    </div>
  );
}

export default ScreenLoading;
