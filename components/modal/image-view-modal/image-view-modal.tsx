import React from 'react';
import Modal from '@src/components/modal/modal/modal';
import classNames from 'classnames/bind';
import styles from './image-view-modal.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const cx = classNames.bind(styles);

interface Props {
  visible: boolean;
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}

function ImageViewModal({ visible, images, initialIndex, onClose }: Props) {
  return (
    <Modal
      visible={visible}
      contentClassName={cx('image_view_modal')}
      closeButtonClassName={cx('close_button')}
      isEscClosable
      onClose={onClose}
    >
      <div className={cx('container')}>
        <Swiper className={cx('images')} initialSlide={initialIndex}>
          {images.map((image) => (
            <SwiperSlide key={image}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="image" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Modal>
  );
}

export default ImageViewModal;
