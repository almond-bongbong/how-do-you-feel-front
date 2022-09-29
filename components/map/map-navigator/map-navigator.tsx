import React from 'react';
import classNames from 'classnames/bind';
import styles from './map-navigator.module.scss';
import Link from 'next/link';

const cx = classNames.bind(styles);

function MapNavigator() {
  return (
    <div className={cx('container')}>
      <h1>
        <Link href="/">
          <a>홈으로</a>
        </Link>
      </h1>
    </div>
  );
}

export default MapNavigator;
