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

      <ul className={cx('menu')}>
        <li>
          <em>계정관리</em>
          <ul>
            <li>
              <Link href="/setting/account">
                <a>비밀번호 변경</a>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default SettingMenu;
