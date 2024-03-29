import React from 'react';
import classNames from 'classnames/bind';
import styles from './loading-screen.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/pro-solid-svg-icons';
import Portal from '@src/components/common/util/portal';

const cx = classNames.bind(styles);

function LoadingScreen() {
  return (
    <Portal id="loader-container">
      <div className={cx('loading')}>
        로딩중
        <FontAwesomeIcon icon={faSpinner} spin />
      </div>
    </Portal>
  );
}

export default LoadingScreen;
