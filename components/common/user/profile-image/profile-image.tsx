import React from 'react';
import Image from 'next/image';
import dummyProfilePhoto from '@src/images/user/dummy-profile-photo.png';
import classNames from 'classnames/bind';
import styles from './profile-image.module.scss';

const cx = classNames.bind(styles);

interface Props {
  src?: string | null;
  alt?: string;
  size: number;
}

function ProfileImage({ src, alt, size }: Props) {
  return (
    <div className={cx('photo')} style={{ width: size, height: size }}>
      <Image src={src ?? dummyProfilePhoto} width={size} height={size} alt={alt} />
    </div>
  );
}

export default ProfileImage;
