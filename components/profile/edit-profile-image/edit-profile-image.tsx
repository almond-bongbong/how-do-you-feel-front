import React, { ChangeEvent, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './edit-profile-image.module.scss';
import ProfileImage from '@src/components/common/user/profile-image';
import Image from 'next/image';
import EditProfilePhotoModal from '@src/components/modal/edit-profile-image-modal';
import { MAX_PROFILE_PHOTO_SIZE } from '@src/constants/file';
import { faCamera } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ImageUploadButton from '@src/components/common/form/image-upload-button';

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
  const [visibleEditImageModal, setVisibleEditImageModal] = useState(false);
  const [selectedImageForEdit, setSelectedImageForEdit] = useState<{
    type: ImageType;
    file: File;
  } | null>(null);

  const handleChangeImage = (type: ImageType, e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const selectedFile = files?.[0];

    if (selectedFile) {
      setSelectedImageForEdit({ type, file: selectedFile });
      setVisibleEditImageModal(true);
    }
  };

  return (
    <div className={cx('container')}>
      <div className={cx('banner_image')}>
        {bannerImage && (
          <Image layout="fill" objectFit="cover" src={bannerImage} alt="프로필 배경 이미지" />
        )}
        <ImageUploadButton
          className={cx('upload_image', 'upload_banner')}
          icon={<FontAwesomeIcon icon={faCamera} />}
          maxImageSize={MAX_PROFILE_PHOTO_SIZE}
          onChange={(e) => handleChangeImage('banner', e)}
        />
      </div>
      <div className={cx('profile_image')}>
        <ProfileImage src={profileImage} size={100} alt="edit" />
        <ImageUploadButton
          className={cx('upload_image', 'upload_profile')}
          icon={<FontAwesomeIcon icon={faCamera} />}
          maxImageSize={MAX_PROFILE_PHOTO_SIZE}
          onChange={(e) => handleChangeImage('profile', e)}
        />
      </div>

      <EditProfilePhotoModal
        visible={visibleEditImageModal}
        imageType={selectedImageForEdit?.type}
        profilePhotoFile={selectedImageForEdit?.file}
        onClose={() => setVisibleEditImageModal(false)}
        onConfirm={(file, dataUrl) => {
          if (selectedImageForEdit?.type === 'banner') onChangeBannerImage(file, dataUrl);
          else onChangeProfileImage(file, dataUrl);
          setVisibleEditImageModal(false);
        }}
      />
    </div>
  );
}

export default EditProfileImage;
