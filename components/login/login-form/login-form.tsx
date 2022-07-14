import React from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import loginBgImage from '../../../images/login/login-bg.webp';
import styles from './login-form.module.scss';
import Button from '../../common/form/button';
import { useModal } from '../../../hooks/modal/useModal';
import LoginModal from '../../common/modal/login-modal';
import KakaoButton from '../kakao-button';
import SignUpModal from '../../common/modal/sign-up-modal';

const cx = classNames.bind(styles);

function LoginForm() {
  const [visibleSignUpModal, openSignUpModal, closeSignUpModal] = useModal(false);
  const [visibleLoginModal, openLoginModal, closeLoginModal] = useModal(false);

  return (
    <>
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
            <KakaoButton text="카카오로 시작하기" />
            <Button className={cx('btn_signup')} onClick={openSignUpModal}>
              이메일로 가입하기
            </Button>
          </div>

          <div className={cx('login_wrap')}>
            <p>이미 가입하셨나요?</p>
            <Button onClick={openLoginModal}>로그인</Button>
          </div>
        </div>

        <SignUpModal
          visible={visibleSignUpModal}
          onClose={closeSignUpModal}
          onSuccessSignUp={() => {
            closeSignUpModal();
            openLoginModal();
          }}
        />
        <LoginModal visible={visibleLoginModal} onClose={closeLoginModal} />
      </div>

      <div className={cx('footer')}>© 2022 Palopalo.</div>
    </>
  );
}

export default LoginForm;
