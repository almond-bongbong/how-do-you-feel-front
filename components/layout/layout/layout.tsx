import React from 'react';
import classNames from 'classnames/bind';
import styles from './layout.module.scss';
import AsideMenu from '../aside-menu';
import { useRouter } from 'next/router';
import PageTitle from '@src/components/common/typography/page-title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/pro-light-svg-icons';

const cx = classNames.bind(styles);

interface Props {
  children: React.ReactNode;
  title?: string;
  hasPrevButton?: boolean;
}

function Layout({ children, title, hasPrevButton }: Props) {
  const router = useRouter();
  const hasHeader = Boolean(title || hasPrevButton);

  return (
    <div className={cx('container')}>
      <div className={cx('content')}>
        <AsideMenu />
        <main className={cx('main', { has_title: Boolean(title) })}>
          {hasHeader && (
            <div className={cx('header', { has_prev: hasPrevButton })}>
              {hasPrevButton && (
                <button type="button" className={cx('prev_button')} onClick={router.back}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                  이전 페이지로 이동
                </button>
              )}
              {title && <PageTitle>{title}</PageTitle>}
            </div>
          )}
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
