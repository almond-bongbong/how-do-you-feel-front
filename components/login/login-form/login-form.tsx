import React from 'react';
import Image from 'next/image';
import qs from 'query-string';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames/bind';
import loginBgImage from '../../../images/login/login-bg.webp';
import styles from './login-form.module.scss';
import { AUTH_STATE_KEY } from '../../../constants/keys';
import Button from '../../common/form/button';
import Modal from '../../common/modal/modal';
import { useModal } from '../../../hooks/modal/useModal';

const cx = classNames.bind(styles);

function LoginForm() {
  const [visibleLoginModal, openLoginModal, closeLoginModal] = useModal(false);

  const handleClickKaKaoAuth = () => {
    const redirectUrl = `${window.location.origin}${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_PATH}`;
    const clientId = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
    const state = uuidv4();
    sessionStorage.setItem(AUTH_STATE_KEY, state);

    const query = qs.stringify({
      client_id: clientId,
      redirect_uri: redirectUrl,
      response_type: 'code',
      state,
    });
    window.location.href = `https://kauth.kakao.com/oauth/authorize?${query}`;
  };

  return (
    <div className={cx('container')}>
      <div className={cx('bg_image')}>
        <Image
          src={loginBgImage}
          alt="로그인 배경 이미지"
          placeholder="blur"
          layout="fill"
          objectFit="cover"
          sizes="70vw"
        />
      </div>
      <div className={cx('form_area')}>
        <h1>로고 이미지</h1>
        <h2>지금 가장 괜찮은 장소</h2>

        <div className={cx('begin_wrap')}>
          <button type="button" className={cx('btn_kakao')} onClick={handleClickKaKaoAuth}>
            카카오로 시작하기
          </button>
        </div>

        <div className={cx('login_wrap')}>
          <p>이미 가입하셨나요?</p>
          <Button style={{ width: 160 }} onClick={openLoginModal}>
            로그인
          </Button>
        </div>
      </div>

      <Modal visible={visibleLoginModal} onClose={closeLoginModal}>
        <p>로그인 폼</p>
        <Button style={{ width: 120 }} onClick={closeLoginModal}>
          닫기
        </Button>
      </Modal>
    </div>
  );
}

export default LoginForm;
