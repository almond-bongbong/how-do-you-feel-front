import React, { ChangeEvent, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './edit-profile-image.module.scss';
import ProfileImage from '@src/components/common/user/profile-image';
import useCurrentUser from '@src/hooks/auth/use-current-user';
import Image from 'next/image';
import UploadImageButton from '@src/components/profile/upload-image-button';
import { validateImage } from '@src/libs/file';
import EditProfilePhotoModal from '@src/components/modal/edit-profile-image-modal';
import { MAX_PROFILE_PHOTO_SIZE } from '@src/constants/file';

const cx = classNames.bind(styles);

function EditProfileImage() {
  const { currentUser } = useCurrentUser();
  const [selectedImageForEdit, setSelectedImageForEdit] = useState<{ file: File } | null>(null);

  const handleChangeBannerImage = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const selectedFile = files?.[0];

    if (selectedFile) {
      const validFile = validateImage(selectedFile, { maxSize: MAX_PROFILE_PHOTO_SIZE });
      if (!validFile) return;

      setSelectedImageForEdit({ file: selectedFile });
    }
  };

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
        <UploadImageButton className={cx('upload_banner')} onChange={handleChangeBannerImage} />
      </div>
      <div className={cx('profile_image')}>
        <ProfileImage src={currentUser?.profileImage?.url} size={100} />
        <UploadImageButton className={cx('upload_profile')} onChange={handleChangeBannerImage} />
      </div>

      <EditProfilePhotoModal
        visible={selectedImageForEdit != null}
        profilePhotoFile={selectedImageForEdit?.file}
        onClose={() => setSelectedImageForEdit(null)}
        onConfirm={console.log}
      />
    </div>
  );
}

export default EditProfileImage;
