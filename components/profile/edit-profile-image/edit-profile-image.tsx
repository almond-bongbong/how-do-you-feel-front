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

type ImageType = 'profile' | 'banner';

function EditProfileImage() {
  const { currentUser } = useCurrentUser();
  const [uploadImageKey, setUploadImageKey] = useState(0);
  const [selectedImageForEdit, setSelectedImageForEdit] = useState<{
    type: ImageType;
    file: File;
  } | null>(null);

  const handleChangeImage = (type: ImageType, e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const selectedFile = files?.[0];
    setUploadImageKey((prev) => prev + 1);

    if (selectedFile) {
      const validFile = validateImage(selectedFile, { maxSize: MAX_PROFILE_PHOTO_SIZE });
      if (!validFile) return;
      setSelectedImageForEdit({ type, file: selectedFile });
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
        <UploadImageButton
          key={uploadImageKey}
          className={cx('upload_banner')}
          onChange={(e) => handleChangeImage('banner', e)}
        />
      </div>
      <div className={cx('profile_image')}>
        <ProfileImage src={currentUser?.profileImage?.url} size={100} />
        <UploadImageButton
          key={uploadImageKey}
          className={cx('upload_profile')}
          onChange={(e) => handleChangeImage('profile', e)}
        />
      </div>

      <EditProfilePhotoModal
        visible={selectedImageForEdit != null}
        imageType={selectedImageForEdit?.type}
        profilePhotoFile={selectedImageForEdit?.file}
        onClose={() => setSelectedImageForEdit(null)}
        onConfirm={console.log}
      />
    </div>
  );
}

export default EditProfileImage;
