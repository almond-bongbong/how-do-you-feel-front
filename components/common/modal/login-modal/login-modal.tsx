import React, { FormEventHandler, useState } from 'react';
import Modal from '../modal';
import classNames from 'classnames/bind';
import styles from './login-modal.module.scss';
import Input from '../../form/input';
import FormField from '../../form/form-field';
import KakaoButton from '../../../login/kakao-button';
import Button from '../../form/button';

const cx = classNames.bind(styles);

interface Props {
  visible: boolean;
  onClose: () => void;
}

function LoginModal({ visible, onClose }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Modal visible={visible} width={500} contentClassName={cx('login_modal')} onClose={onClose}>
      <div className={cx('login_form')}>
        <form onSubmit={handleSubmit}>
          <h2>로그인 하기</h2>
          <FormField>
            <Input
              placeholder="아이디 (이메일)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormField>
          <FormField>
            <Input
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormField>
          <Button
            type="submit"
            disabled={!email || !password}
            theme="primary-line"
            className={cx('btn_login')}
          >
            로그인
          </Button>
        </form>

        <div className={cx('sns_login')}>
          <KakaoButton text="카카오로 로그인 하기" />
        </div>
      </div>
    </Modal>
  );
}

export default LoginModal;
