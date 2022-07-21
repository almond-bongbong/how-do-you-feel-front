import React, { useState } from 'react';
import Modal from '@src/components/modal/modal';
import FormField from '@src/components/common/form/form-field';
import Input from '@src/components/common/form/input/input';
import Button from '@src/components/common/form/button';
import classNames from 'classnames/bind';
import styles from './edit-profile-modal.module.scss';
import EditProfileImage from '@src/components/profile/edit-profile-image';
import Textarea from '@src/components/common/form/textarea';
import useCurrentUser from '@src/hooks/auth/use-current-user';
import * as fileApi from '@src/api/file';
import { EditProfileMutationVariables, useEditProfileMutation } from '@src/generated/graphql';
import { ApolloError } from '@apollo/client';
import {
  checkUsernameValidation,
  isValidToInputStatus,
  ValidationResult,
} from '@src/libs/validation';

const cx = classNames.bind(styles);

interface Props {
  visible: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface UpdatedFile {
  file: File;
  dataUrl: string;
}

function EditProfileModal({ visible, onClose, onSuccess }: Props) {
  const { currentUser } = useCurrentUser();
  const [editProfileMutation] = useEditProfileMutation();
  const [updatedBannerImage, setUpdatedBannerImage] = useState<UpdatedFile | null>(null);
  const [updatedProfileImage, setUpdatedProfileImage] = useState<UpdatedFile | null>(null);
  const bannerImage = updatedBannerImage?.dataUrl ?? currentUser?.bannerImage?.url;
  const profileImage = updatedProfileImage?.dataUrl || currentUser?.profileImage?.url;
  const [username, setUsername] = useState(currentUser?.username ?? '');
  const [usernameValidation, setUsernameValidation] = useState<ValidationResult>();
  const [location, setLocation] = useState(currentUser?.location ?? '');
  const [bio, setBio] = useState(currentUser?.bio ?? '');
  const [loading, setLoading] = useState(false);

  const handleSubmitProfile = async () => {
    const inputData: EditProfileMutationVariables['input'] = {
      username,
      bio,
      location,
    };

    const validationMessage = usernameValidation?.message;
    if (validationMessage) return Modal.alert(validationMessage);

    try {
      setLoading(true);
      const [bannerResponse, profileResponse] = await Promise.all([
        updatedBannerImage ? fileApi.uploadFile(updatedBannerImage.file) : Promise.resolve(),
        updatedProfileImage ? fileApi.uploadFile(updatedProfileImage.file) : Promise.resolve(),
      ]);
      if (bannerResponse) {
        inputData.bannerImage = {
          url: `${bannerResponse.data.bucketUrl}/${bannerResponse.data.key}`,
          key: bannerResponse.data.key,
        };
      }
      if (profileResponse) {
        inputData.profileImage = {
          url: `${profileResponse.data.bucketUrl}/${profileResponse.data.key}`,
          key: profileResponse.data.key,
        };
      }
    } catch (error) {
      console.error(error);
      await Modal.alert('이미지 업로드에 실패했습니다.');
      return;
    }

    try {
      await editProfileMutation({
        variables: { input: inputData },
      });
      onSuccess?.();
    } catch (error) {
      const message = error instanceof ApolloError ? error.message : '오류가 발생했습니다.';
      await Modal.alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} hasCloseButton onClose={onClose}>
      <div className={cx('edit_form')}>
        <h2>프로필 수정하기</h2>

        <EditProfileImage
          bannerImage={bannerImage}
          profileImage={profileImage}
          onChangeBannerImage={(file, dataUrl) => setUpdatedBannerImage({ file, dataUrl })}
          onChangeProfileImage={(file, dataUrl) => setUpdatedProfileImage({ file, dataUrl })}
        />

        <FormField label="사용자명" id="username">
          <Input
            id="username"
            max={15}
            description="최소 3자이상 최대 15자, 영문, 한글, 숫자만 입력가능합니다."
            value={username}
            status={isValidToInputStatus(usernameValidation?.isValid)}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={(e) => setUsernameValidation(checkUsernameValidation(e.target.value))}
          />
        </FormField>
        <FormField label="장소" id="location">
          <Input
            id="location"
            max={20}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </FormField>
        <FormField label="설명글" id="bio">
          <Textarea
            id="bio"
            max={100}
            value={bio}
            row={4}
            onChange={(e) => setBio(e.target.value)}
          />
        </FormField>

        <Button
          theme="primary-line"
          className={cx('edit_button')}
          loading={loading}
          onClick={handleSubmitProfile}
        >
          수정하기
        </Button>
      </div>
    </Modal>
  );
}

export default EditProfileModal;
