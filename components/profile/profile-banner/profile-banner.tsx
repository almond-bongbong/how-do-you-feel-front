import React from 'react';
import classNames from 'classnames/bind';
import styles from './profile-banner.module.scss';
import Image from 'next/image';
import loginBgImage from '@src/images/login/login-bg.webp';
import ProfileImage from '@src/components/common/user/profile-image';
import useCurrentUser from '@src/hooks/auth/use-current-user';
import Button from '@src/components/common/form/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/pro-light-svg-icons';
import EditProfileModal from '@src/components/modal/edit-profile-modal';

const cx = classNames.bind(styles);

function ProfileBanner() {
  const { currentUser } = useCurrentUser();

  if (!currentUser) return <div>loading</div>;

  return (
    <div className={cx('container')}>
      <div className={cx('banner')}>
        <Image
          src={loginBgImage}
          alt="사용자 배너 이미지"
          placeholder="blur"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className={cx('info')}>
        <div className={cx('photo')}>
          <ProfileImage size={150} />
        </div>

        <div className={cx('user')}>
          <span className={cx('name')}>{currentUser.username}</span>
          <span className={cx('location')}>
            <FontAwesomeIcon icon={faLocationDot} />
            서울
          </span>
        </div>

        <div className={cx('people')}>
          <span>0 팔로잉</span>
          <span>0 팔로워</span>
        </div>
        <Button className={cx('edit_button')} size="sm">
          수정하기
        </Button>
      </div>

      <EditProfileModal visible onClose={console.log} />
    </div>
  );
}

export default ProfileBanner;
