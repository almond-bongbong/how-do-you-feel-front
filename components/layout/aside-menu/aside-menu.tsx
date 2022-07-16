import React from 'react';
import classNames from 'classnames/bind';
import styles from './aside-menu.module.scss';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/pro-solid-svg-icons';
import { faRoad, faUser } from '@fortawesome/pro-light-svg-icons';
import Button from '../../common/form/button';
import MyProfile from '../my-profile';

const cx = classNames.bind(styles);

function AsideMenu() {
  return (
    <header className={cx('aside')}>
      <h1>로고</h1>
      <nav>
        <ul className={cx('navigation')}>
          <li>
            <Link href="/">
              <a>
                <FontAwesomeIcon icon={faHome} />
                홈으로
              </a>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <a>
                <FontAwesomeIcon icon={faUser} />
                프로필
              </a>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <a>
                <FontAwesomeIcon icon={faRoad} />
                로드맵
              </a>
            </Link>
          </li>
        </ul>
      </nav>

      <Button theme="primary" size="lg">
        작성하기
      </Button>

      <MyProfile />
    </header>
  );
}

export default AsideMenu;
