import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import dummyProfilePhoto from '@src/images/user/dummy-profile-photo.png';
import classNames from 'classnames/bind';
import styles from './profile-image.module.scss';
import { loadImage } from '@src/libs/image';
import { HTTP_URL_REGEXP } from '@src/libs/regexp';

const cx = classNames.bind(styles);

interface Props {
  src?: string | null;
  alt?: string;
  size: number;
  className?: string;
}

function ProfileImage({ src, alt, size, className }: Props) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src) return;
    if (HTTP_URL_REGEXP.test(src)) loadImage(src).catch(() => setHasError(true));
    else setHasError(false);
  }, [src]);

  return (
    <div className={cx('photo', className)} style={{ width: size, height: size }}>
      <Image
        src={src && !hasError ? src : dummyProfilePhoto}
        width={size}
        height={size}
        alt={alt}
      />
    </div>
  );
}

export default ProfileImage;
