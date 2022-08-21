import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './change-password-form.module.scss';
import FormField from '@src/components/common/form/form-field';
import Input from '@src/components/common/form/input';
import Button from '@src/components/common/form/button';
import { useChangePasswordMutation } from '@src/generated/graphql';
import Modal from '@src/components/modal/modal';
import { ApolloError } from '@apollo/client';
import { useRouter } from 'next/router';
import { checkPasswordConfirmValidation, checkPasswordValidation } from '@src/libs/validation';

const cx = classNames.bind(styles);

function ChangePasswordForm() {
  const router = useRouter();
  const [changePasswordMutation, { loading }] = useChangePasswordMutation();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  const handleSubmit = async () => {
    const validationMessage =
      checkPasswordValidation(newPassword).message ||
      checkPasswordConfirmValidation(newPasswordConfirm, newPassword).message;
    if (!currentPassword) return Modal.alert('현재 비밀번호를 입력해주세요.');
    if (!newPassword) return Modal.alert('새 비밀번호를 입력해주세요.');
    if (!newPasswordConfirm) return Modal.alert('새 비밀번호 확인을 입력해주세요.');
    if (validationMessage) return Modal.alert(validationMessage);

    try {
      await changePasswordMutation({
        variables: {
          input: {
            currentPassword,
            newPassword,
            newPasswordConfirm,
          },
        },
      });
      await Modal.alert('비밀번호가 변경되었습니다.');
      await router.push('/setting');
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof ApolloError ? error.message : '요청에 실패했습니다.';
      await Modal.alert(errorMessage);
    }
  };

  return (
    <div className={cx('container')}>
      <FormField label="현재 비밀번호" id="current_password">
        <Input
          type="password"
          id="current_password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </FormField>
      <FormField label="새로운 비밀번호" id="new_password">
        <Input
          type="password"
          id="new_password"
          description="새로운 비밀번호를 최소 6자 이상 입력해주세요."
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </FormField>
      <FormField label="새로운 비밀번호 확인" id="new_password_confirm">
        <Input
          type="password"
          id="new_password_confirm"
          description="새로운 비밀번호를 다시 입력해주세요."
          value={newPasswordConfirm}
          onChange={(e) => setNewPasswordConfirm(e.target.value)}
        />
      </FormField>

      <Button
        theme="primary-line"
        className={cx('submit_button')}
        loading={loading}
        onClick={handleSubmit}
      >
        비밀번호 변경
      </Button>
    </div>
  );
}

export default ChangePasswordForm;
