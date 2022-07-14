import React, { useState } from 'react';
import Modal from '../modal';
import classNames from 'classnames/bind';
import styles from './sign-up-modal.module.scss';
import FormField from '../../form/form-field';
import Input from '../../form/input';
import Button from '../../form/button';
import alertModal from '../alert-modal';
import {
  checkEmailValidation,
  checkPasswordConfirmValidation,
  checkPasswordValidation,
  checkUsernameValidation,
  ValidationResult,
} from '../../../../libs/validation';
import { ApolloError } from '@apollo/client';
import { useSignUpMutation } from '../../../../generated/graphql';

const cx = classNames.bind(styles);

interface Props {
  visible?: boolean;
  onClose?: () => void;
  onSuccessSignUp?: () => void;
}

const isValidToStatus = (isValid?: boolean) => {
  if (isValid === undefined) return undefined;
  return isValid ? 'success' : 'error';
};

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

    if (validationMessage) {
      await alertModal(validationMessage);
      return;
    }

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
        await alertModal(errors[0].message);
        return;
      }

      await alertModal('가입이 완료되었습니다.\n로그인 해주세요!');
      onSuccessSignUp?.();
    } catch (error) {
      const message =
        error instanceof ApolloError ? error.message : '알 수 없는 오류가 발생했습니다.';
      await alertModal(message);
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
            status={isValidToStatus(emailValidation?.isValid)}
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
            status={isValidToStatus(passwordValidation?.isValid)}
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
            status={isValidToStatus(passwordConfirmValidation?.isValid)}
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
            description="최소 3자이상, 영문, 한글, 숫자만 입력가능합니다."
            max={15}
            status={isValidToStatus(usernameValidation?.isValid)}
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
