import React from 'react';
import classNames from 'classnames/bind';
import styles from './setting-menu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faRoad, faUnlock } from '@fortawesome/pro-light-svg-icons';
import Modal from '@src/components/modal/modal';
import useCurrentUser from '@src/hooks/auth/use-current-user';
import { useRouter } from 'next/router';
import Link from 'next/link';

const cx = classNames.bind(styles);

function SettingMenu() {
  const router = useRouter();
  const { currentUser, logout } = useCurrentUser();

  const handleChangePasswordClick = async () => {
    if (currentUser?.platform !== 'EMAIL') {
      await Modal.alert('비밀번호 변경은 이메일 계정만 가능합니다.');
      return;
    }
    await router.push('/setting/change-password');
  };

  const handleLogoutClick = async () => {
    const isOk = await Modal.confirm('로그아웃 하시겠습니까?');
    if (!isOk) return;
    await logout();
  };

  return (
    <div className={cx('container')}>
      <ul className={cx('menu')}>
        <li>
          <em>계정관리</em>
          <ul>
            <li>
              <button type="button" onClick={handleChangePasswordClick}>
                <FontAwesomeIcon icon={faKey} />
                비밀번호 변경
              </button>
            </li>
            <li>
              <button type="button" onClick={handleLogoutClick}>
                <FontAwesomeIcon icon={faUnlock} />
                로그아웃
              </button>
            </li>
          </ul>
        </li>
        <li>
          <em>소개</em>
          <ul>
            <li>
              <Link href="/roadmap">
                <a>
                  <FontAwesomeIcon icon={faRoad} />
                  로드맵
                </a>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default SettingMenu;
