import React from 'react';
import classNames from 'classnames/bind';
import styles from './place-detail.module.scss';
import ProfileImage from '@src/components/common/user/profile-image';

const cx = classNames.bind(styles);

interface Props {
  content: string;
  createdAt: number;
  account: {
    id: string;
    username: string;
    profileUrl?: string;
  };
  location?: string | null;
  lng?: number | null;
  lat?: number | null;
  imageUrls?: string[];
}

function PlaceDetail({ content, createdAt, account, location, imageUrls }: Props) {
  return (
    <div className={cx('container')}>
      <div className={cx('user')}>
        <ProfileImage size={48} src={account.profileUrl} />
      </div>
      <div className={cx('content')}>{content}</div>
    </div>
  );
}

export default PlaceDetail;
