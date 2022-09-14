import React, { ReactNode, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './layout.module.scss';
import AsideMenu from '../aside-menu';
import { useRouter } from 'next/router';
import PageTitle from '@src/components/common/typography/page-title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/pro-light-svg-icons';

const cx = classNames.bind(styles);

interface Props {
  children: ReactNode;
  title?: string;
  hasPrevButton?: boolean;
  hasContentType?: boolean;
}

function Layout({ children, title, hasPrevButton, hasContentType }: Props) {
  const router = useRouter();
  const headerRef = useRef<HTMLDivElement>(null);
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const hasHeader = Boolean(title || hasPrevButton);

  useEffect(() => {
    const handleScroll = () => {
      const header = headerRef.current;
      if (!header) return;

      const headerHeight = header.clientHeight || 0;
      const headerOffsetTop = header.offsetTop | 0;
      const headerOffsetBottom = headerHeight + headerOffsetTop;
      const scrollY = window.scrollY;
      setIsHeaderFixed(scrollY >= headerOffsetBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={cx('container')}>
      <div className={cx('content')}>
        <AsideMenu />
        <main className={cx('main', { has_content: Boolean(hasContentType) })}>
          {hasHeader && (
            <div className={cx('header_wrap', { fixed: isHeaderFixed })}>
              <div className={cx('header')} ref={headerRef}>
                {hasPrevButton && (
                  <button type="button" className={cx('prev_button')} onClick={router.back}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                    이전 페이지로 이동
                  </button>
                )}
                {title && <PageTitle className={cx('title')}>{title}</PageTitle>}
              </div>
            </div>
          )}
          <div className={cx('article')}>{children}</div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
