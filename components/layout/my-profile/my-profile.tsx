import React from 'react';
import classNames from 'classnames/bind';
import styles from './my-profile.module.scss';
import Image from 'next/image';
import useCurrentUser from '../../../hooks/auth/use-current-user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/pro-light-svg-icons';
import Modal from '../../common/modal/modal';

const cx = classNames.bind(styles);

function MyProfile() {
  const { currentUser, logout } = useCurrentUser();

  const handleClickLogout = async () => {
    const isOk = await Modal.confirm('로그아웃 하시겠습니까?');
    if (isOk) await logout();
  };

  if (!currentUser) return null;

  return (
    <div className={cx('my_profile')}>
      <div className={cx('photo')}>
        <Image
          src={'https://picsum.photos/200/300'}
          width={40}
          height={40}
          alt={`${currentUser.username}님의 프로필`}
        />
      </div>
      <div className={cx('username')}>
        {currentUser.username}
        <button type="button" className={cx('logout')} onClick={handleClickLogout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </button>
      </div>
    </div>
  );
}

export default MyProfile;
