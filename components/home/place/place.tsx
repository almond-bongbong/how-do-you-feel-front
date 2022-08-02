import React from 'react';
import classNames from 'classnames/bind';
import styles from './place.module.scss';
import ProfileImage from '@src/components/common/user/profile-image';

const cx = classNames.bind(styles);

interface Props {
  profileImage?: string;
  username: string;
  content: string;
}

function Place({ profileImage, username, content }: Props) {
  return (
    <div className={cx('container')}>
      <ProfileImage size={48} src={profileImage} className={cx('profile_image')} />
      <div className={cx('content_wrap')}>
        <div className={cx('username')}>{username}</div>
        <div className={cx('content')}>{content}</div>
      </div>
    </div>
  );
}

export default Place;
