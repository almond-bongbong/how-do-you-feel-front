import React from 'react';
import classNames from 'classnames/bind';
import styles from './map-navigator.module.scss';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/pro-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/pro-light-svg-icons';
import { useRouter } from 'next/router';

const cx = classNames.bind(styles);

function MapNavigator() {
  const router = useRouter();

  return (
    <div className={cx('container')}>
      <header className={cx('header')}>
        <button type="button" className={cx('prev_button')} onClick={router.back}>
          <FontAwesomeIcon icon={faChevronLeft} />
          이전 페이지로 이동
        </button>
        <h1 className={cx('logo')}>
          <Link href="/">
            <a>
              <FontAwesomeIcon icon={faHome} />
            </a>
          </Link>
        </h1>
      </header>
    </div>
  );
}

export default MapNavigator;
