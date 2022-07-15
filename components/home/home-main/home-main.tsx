import React from 'react';
import classNames from 'classnames/bind';
import styles from './home-main.module.scss';

const cx = classNames.bind(styles);

function HomeMain() {
  return (
    <div className={cx('main')}>
      hello
    </div>
  );
}

export default HomeMain;
