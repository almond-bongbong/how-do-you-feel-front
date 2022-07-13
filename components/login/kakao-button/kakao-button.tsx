import React from 'react';
import classNames from 'classnames/bind';
import styles from './kakao-button.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { AUTH_STATE_KEY } from '../../../constants/keys';
import qs from 'query-string';

const cx = classNames.bind(styles);

interface Props {
  text: string;
}

function KakaoButton({ text }: Props) {
  const handleClick = () => {
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
    <button type="button" className={cx('btn_kakao')} onClick={handleClick}>
      {text}
    </button>
  );
}

export default KakaoButton;
