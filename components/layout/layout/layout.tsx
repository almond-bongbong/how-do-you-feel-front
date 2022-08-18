import React from 'react';
import classNames from 'classnames/bind';
import styles from './layout.module.scss';
import AsideMenu from '../aside-menu';
import PageTitle from '@src/components/common/typography/page-title';

const cx = classNames.bind(styles);

interface Props {
  children: React.ReactNode;
  title?: string;
}

function Layout({ children, title }: Props) {
  return (
    <div className={cx('container')}>
      <div className={cx('content')}>
        <AsideMenu />
        <main className={cx('main', { has_title: Boolean(title) })}>
          {title && <PageTitle>{title}</PageTitle>}
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
