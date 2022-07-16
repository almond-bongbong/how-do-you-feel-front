import React from 'react';
import Modal from '@src/components/modal/modal/modal';
import FormField from '@src/components/common/form/form-field';
import Input from '@src/components/common/form/input/input';
import Button from '@src/components/common/form/button';
import classNames from 'classnames/bind';
import styles from './edit-profile-modal.module.scss';
import EditProfileImage from '@src/components/profile/edit-profile-image';
import Textarea from '@src/components/common/form/textarea';

const cx = classNames.bind(styles);

interface Props {
  visible: boolean;
  onClose: () => void;
}

function EditProfileModal({ visible, onClose }: Props) {
  return (
    <Modal visible={visible} hasCloseButton onClose={onClose}>
      <div className={cx('edit_form')}>
        <h2>프로필 수정하기</h2>

        <EditProfileImage />

        <FormField label="사용자명" id="username">
          <Input
            id="username"
            max={15}
            description="최소 3자이상 최대 15자, 영문, 한글, 숫자만 입력가능합니다."
            value=""
            onChange={console.log}
          />
        </FormField>
        <FormField label="장소" id="location">
          <Input id="location" max={20} value="" onChange={console.log} />
        </FormField>
        <FormField label="설명글" id="bio">
          <Textarea
            id="bio"
            max={100}
            value={'qwe\nqwe\nqwe\nqwe'}
            row={4}
            onChange={console.log}
          />
        </FormField>

        <Button theme="primary-line" className={cx('edit_button')}>
          수정하기
        </Button>
      </div>
    </Modal>
  );
}

export default EditProfileModal;
