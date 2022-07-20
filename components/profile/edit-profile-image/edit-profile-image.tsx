import React, { ChangeEvent, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './edit-profile-image.module.scss';
import ProfileImage from '@src/components/common/user/profile-image';
import Image from 'next/image';
import UploadImageButton from '@src/components/profile/upload-image-button';
import { validateImage } from '@src/libs/file';
import EditProfilePhotoModal from '@src/components/modal/edit-profile-image-modal';
import { MAX_PROFILE_PHOTO_SIZE } from '@src/constants/file';

const cx = classNames.bind(styles);

interface Props {
  bannerImage?: string | null;
  profileImage?: string | null;
  onChangeBannerImage: (file: File, dataUrl: string) => void;
  onChangeProfileImage: (file: File, dataUrl: string) => void;
}

type ImageType = 'profile' | 'banner';

function EditProfileImage({
  bannerImage,
  profileImage,
  onChangeBannerImage,
  onChangeProfileImage,
}: Props) {
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
        {bannerImage && (
          <Image layout="fill" objectFit="cover" src={bannerImage} alt="프로필 배경 이미지" />
        )}
        <UploadImageButton
          key={uploadImageKey}
          className={cx('upload_banner')}
          onChange={(e) => handleChangeImage('banner', e)}
        />
      </div>
      <div className={cx('profile_image')}>
        <ProfileImage src={profileImage} size={100} alt="edit" />
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
        onConfirm={(file, dataUrl) => {
          if (selectedImageForEdit?.type === 'banner') onChangeBannerImage(file, dataUrl);
          else onChangeProfileImage(file, dataUrl);
          setSelectedImageForEdit(null);
        }}
      />
    </div>
  );
}

export default EditProfileImage;
