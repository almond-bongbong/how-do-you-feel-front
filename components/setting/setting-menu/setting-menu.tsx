import React from 'react';
import classNames from 'classnames/bind';
import styles from './setting-menu.module.scss';
import Link from 'next/link';
import PageTitle from '@src/components/common/typography/page-title';

const cx = classNames.bind(styles);

function SettingMenu() {
  return (
    <div className={cx('container')}>
      <PageTitle>설정</PageTitle>

      <ul>
        <li>
          <Link href="/setting/account">
            <a>계정관리</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SettingMenu;
