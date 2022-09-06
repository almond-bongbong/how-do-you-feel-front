import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/pro-light-svg-icons';
import classNames from 'classnames/bind';
import ProfileImage from '@src/components/common/user/profile-image';
import useCurrentUser from '@src/hooks/auth/use-current-user';
import styles from './my-profile.module.scss';
import Modal from '@src/components/modal/modal';

const cx = classNames.bind(styles);

interface Props {
  className?: string;
}

function MyProfile({ className }: Props) {
  const { currentUser, logout } = useCurrentUser();

  const handleClickLogout = async () => {
    const isOk = await Modal.confirm('로그아웃 하시겠습니까?');
    if (isOk) await logout();
  };

  if (!currentUser) return null;

  return (
    <div className={cx('my_profile', className)}>
      <div className={cx('photo')}>
        <ProfileImage
          src={currentUser.profileImage?.url}
          size={40}
          alt={`${currentUser.username}님의 프로필사진`}
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
