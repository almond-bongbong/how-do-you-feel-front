import React from 'react';
import Modal from '@src/components/modal/modal';
import classNames from 'classnames/bind';
import styles from './place-detail-modal.module.scss';

const cx = classNames.bind(styles);

interface Props {
  visible: boolean;
  placeId: number;
  onClose: () => void;
}

function PlaceDetailModal({ visible, placeId, onClose }: Props) {
  return (
    <Modal visible={visible} isMaskClosable isEscClosable onClose={onClose}>
      <div className={cx('container')}>hello {placeId}</div>
    </Modal>
  );
}

export default PlaceDetailModal;
