import React from 'react';
import classNames from 'classnames/bind';
import styles from './map-view-modal.module.scss';
import StaticMap from '@src/components/common/map/static-map';
import Modal from '@src/components/modal/modal';

const cx = classNames.bind(styles);

interface Props {
  visible: boolean;
  x?: number | null;
  y?: number | null;
  address?: string | null;
  onClose: () => void;
}

function MapViewModal({ visible, x, y, address, onClose }: Props) {
  return (
    <Modal
      visible={visible}
      hasCloseButton
      isEscClosable
      isMaskClosable
      contentClassName={cx('container')}
      onClose={onClose}
    >
      <StaticMap x={x} y={y} className={cx('location_map')} />
      {address && <div className={cx('address')}>{address}</div>}
    </Modal>
  );
}

export default MapViewModal;
