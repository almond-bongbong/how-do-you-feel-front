import React, { FormEventHandler, useState } from 'react';
import Modal from '../modal';
import classNames from 'classnames/bind';
import styles from './login-modal.module.scss';
import { ApolloError } from '@apollo/client';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useSignInMutation } from '@src/generated/graphql';
import { TOKEN_KEY } from '@src/constants/keys';
import FormField from '@src/components/common/form/form-field';
import Input from '@src/components/common/form/input';
import Button from '@src/components/common/form/button';
import KakaoButton from '@src/components/login/kakao-button';

const cx = classNames.bind(styles);

interface Props {
  visible: boolean;
  onClose: () => void;
}

function LoginModal({ visible, onClose }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMutation] = useSignInMutation();
  const [loading, setLoading] = useState(false);

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await loginMutation({
        variables: {
          input: { email, password, platform: 'EMAIL' },
        },
      });
      if (!data) return Modal.alert('로그인에 실패했습니다.');
      Cookies.set(TOKEN_KEY, data.signIn.token);
      await router.push('/');
    } catch (error) {
      const message =
        error instanceof ApolloError ? error.message : '알 수 없는 오류가 발생했습니다.';
      await Modal.alert(message);
    } finally {
      setLoading(false);
    }
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormField>
          <Button
            type="submit"
            disabled={!email || !password}
            loading={loading}
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
