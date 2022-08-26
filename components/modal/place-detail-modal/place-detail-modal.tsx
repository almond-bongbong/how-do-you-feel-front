import React from 'react';
import Modal from '@src/components/modal/modal';
import classNames from 'classnames/bind';
import styles from './place-detail-modal.module.scss';

const cx = classNames.bind(styles);

interface Props {
  visible: boolean;
  onClose: () => void;
}

function PlaceDetailModal({ visible, onClose }: Props) {
  return (
    <Modal visible={visible} onClose={onClose}>
      <div className={cx('container')}>hello</div>
    </Modal>
  );
}

export default PlaceDetailModal;
