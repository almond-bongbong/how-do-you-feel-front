import React from 'react';
import classNames from 'classnames/bind';
import styles from './edit-profile-image.module.scss';
import ProfileImage from '@src/components/common/user/profile-image';
import useCurrentUser from '@src/hooks/auth/use-current-user';
import Image from 'next/image';
import UploadImageButton from '@src/components/profile/upload-image-button';

const cx = classNames.bind(styles);

function EditProfileImage() {
  const { currentUser } = useCurrentUser();

  return (
    <div className={cx('container')}>
      <div className={cx('banner_image')}>
        {currentUser?.bannerImage?.url && (
          <Image
            layout="fill"
            objectFit="cover"
            src={currentUser.bannerImage.url}
            alt="프로필 배경 이미지"
          />
        )}
        <UploadImageButton className={cx('upload_banner')} />
      </div>
      <div className={cx('profile_image')}>
        <ProfileImage src={currentUser?.profileImage?.url} size={100} />
        <UploadImageButton className={cx('upload_profile')} />
      </div>
    </div>
  );
}

export default EditProfileImage;
