import React, { useState } from 'react';
import Modal from '../modal';
import classNames from 'classnames/bind';
import styles from './sign-up-modal.module.scss';
import {
  checkEmailValidation,
  checkPasswordConfirmValidation,
  checkPasswordValidation,
  checkUsernameValidation,
  isValidToInputStatus,
  ValidationResult,
} from '@src/libs/validation';
import { ApolloError } from '@apollo/client';
import { useSignUpMutation } from '@src/generated/graphql';
import FormField from '@src/components/common/form/form-field';
import Input from '@src/components/common/form/input';
import Button from '@src/components/common/form/button';

const cx = classNames.bind(styles);

interface Props {
  visible?: boolean;
  onClose?: () => void;
  onSuccessSignUp?: () => void;
}

function SignUpModal({ visible, onClose, onSuccessSignUp }: Props) {
  const [email, setEmail] = useState('');
  const [emailValidation, setEmailValidation] = useState<ValidationResult>();
  const [password, setPassword] = useState('');
  const [passwordValidation, setPasswordValidation] = useState<ValidationResult>();
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordConfirmValidation, setPasswordConfirmValidation] = useState<ValidationResult>();
  const [username, setUsername] = useState('');
  const [usernameValidation, setUsernameValidation] = useState<ValidationResult>();
  const [signUpMutation] = useSignUpMutation();

  const handleClickSignUp = async () => {
    const validationMessage =
      emailValidation?.message ??
      passwordValidation?.message ??
      passwordConfirmValidation?.message ??
      usernameValidation?.message;

    if (validationMessage) return Modal.alert(validationMessage);
    if (!email) return Modal.alert('이메일을 입력해주세요.');
    if (!password) return Modal.alert('비밀번호를 입력해주세요.');
    if (!passwordConfirm) return Modal.alert('비밀번호 확인을 입력해주세요.');
    if (!username) return Modal.alert('사용자명을 입력해주세요.');

    try {
      const { errors } = await signUpMutation({
        variables: {
          input: {
            email,
            password,
            username,
          },
        },
      });

      if (errors) {
        await Modal.alert(errors[0].message);
        return;
      }

      await Modal.alert('가입이 완료되었습니다.\n로그인 해주세요!');
      onSuccessSignUp?.();
    } catch (error) {
      const message =
        error instanceof ApolloError ? error.message : '알 수 없는 오류가 발생했습니다.';
      await Modal.alert(message);
    }
  };

  return (
    <Modal visible={visible} contentClassName={cx('sign_up_modal')} onClose={onClose}>
      <div className={cx('sign_up_form')}>
        <h2>회원가입 하기</h2>

        <FormField label="아이디 (이메일)" id="email">
          <Input
            id="email"
            max={40}
            status={isValidToInputStatus(emailValidation?.isValid)}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => setEmailValidation(checkEmailValidation(e.target.value))}
          />
        </FormField>
        <FormField label="비밀번호" id="password">
          <Input
            type="password"
            id="password"
            description="최소 6자 이상 입력해주세요."
            status={isValidToInputStatus(passwordValidation?.isValid)}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={(e) => {
              setPasswordValidation(checkPasswordValidation(e.target.value));
              setPasswordConfirmValidation(
                checkPasswordConfirmValidation(passwordConfirm, e.target.value),
              );
            }}
          />
        </FormField>
        <FormField label="비밀번호 확인" id="password-confirm">
          <Input
            type="password"
            id="password-confirmation"
            status={isValidToInputStatus(passwordConfirmValidation?.isValid)}
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            onBlur={(e) =>
              setPasswordConfirmValidation(checkPasswordConfirmValidation(e.target.value, password))
            }
          />
        </FormField>
        <FormField label="사용자명" id="nickname">
          <Input
            id="nickname"
            description="최소 3자이상 최대 15자, 영문, 한글, 숫자만 입력가능합니다."
            max={15}
            status={isValidToInputStatus(usernameValidation?.isValid)}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={(e) => setUsernameValidation(checkUsernameValidation(e.target.value))}
          />
        </FormField>

        <Button theme="primary" className={cx('btn_sign_up')} onClick={handleClickSignUp}>
          가입하기
        </Button>
      </div>
    </Modal>
  );
}

export default SignUpModal;
