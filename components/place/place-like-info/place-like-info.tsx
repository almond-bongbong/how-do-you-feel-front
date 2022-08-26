import React from 'react';
import classNames from 'classnames/bind';
import styles from './place-like-info.module.scss';
import Link from 'next/link';
import ProfileImage from '@src/components/common/user/profile-image';
import dayjs from 'dayjs';

const cx = classNames.bind(styles);

interface Props {
  id: number;
  profileUrl?: string;
  username?: string;
  content?: string;
  location?: string;
  likedAt: number;
}

function PlaceLikeInfo({ id, profileUrl, username, content, location, likedAt }: Props) {
  const isThisYear = dayjs().year() === dayjs(likedAt).year();
  const likedAtText = isThisYear
    ? dayjs(likedAt).format('MM월 DD일')
    : dayjs(likedAt).format('YYYY년 MM월 DD일');

  return (
    <div className={cx('container')}>
      <div className={cx('profile_image')}>
        <Link href={`/profile/${id}`}>
          <a>
            <ProfileImage size={40} src={profileUrl} />
          </a>
        </Link>
      </div>
      <div className={cx('info')}>
        <div className={cx('info_head')}>
          <Link href={`/profile/${id}`}>
            <a>{username}</a>
          </Link>
          <div className={cx('date')}>{`${likedAtText}에 좋아했어요`}</div>
        </div>
        <div className={cx('content')}>{content}</div>
      </div>
    </div>
  );
}

export default PlaceLikeInfo;
