import React from 'react';
import classNames from 'classnames/bind';
import styles from './layout.module.scss';
import AsideMenu from '../aside-menu';

const cx = classNames.bind(styles);

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className={cx('container')}>
      <div className={cx('content')}>
        <AsideMenu />
        <main className={cx('main')}>{children}</main>
      </div>
    </div>
  );
}

export default Layout;
