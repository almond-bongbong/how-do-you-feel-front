import React, { FormEventHandler } from 'react';
import Modal from '../modal';
import classNames from 'classnames/bind';
import styles from './login-modal.module.scss';
import Input from '../../form/input';

const cx = classNames.bind(styles);

interface Props {
  visible: boolean;
  onClose: () => void;
}

function LoginModal({ visible, onClose }: Props) {
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Modal visible={visible} width={500} contentClassName={cx('login_modal')} onClose={onClose}>
      <h2>로그인 하기</h2>

      <form className={cx('login_form')} onSubmit={handleSubmit}>
        <Input value="abc가나" onChange={console.log} />
      </form>
    </Modal>
  );
}

export default LoginModal;
