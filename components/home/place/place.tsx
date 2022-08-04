import React from 'react';
import classNames from 'classnames/bind';
import styles from './place.module.scss';
import ProfileImage from '@src/components/common/user/profile-image';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/pro-solid-svg-icons';
import Modal from '@src/components/modal/modal/modal';
import StaticMap from '@src/components/common/map/static-map';
import { useModal } from '@src/hooks/modal/use-modal';
import ImageViewModal from '@src/components/modal/image-view-modal';

const cx = classNames.bind(styles);

interface Props {
  profileImage?: string;
  username: string;
  content: string;
  address?: string | null;
  x?: number | null;
  y?: number | null;
  images: string[];
}

function Place({ profileImage, username, content, address, x, y, images }: Props) {
  const [visibleMap, openMap, closeMap, mapPosition] = useModal<{ x: number; y: number } | null>(
    false,
  );
  const [visibleImage, openImage, closeImage] = useModal();

  return (
    <div className={cx('container')}>
      <ProfileImage size={48} src={profileImage} className={cx('profile_image')} />
      <div className={cx('content_area')}>
        <div className={cx('username')}>{username}</div>
        <div className={cx('content')}>{content}</div>
        {address && (
          <button
            type="button"
            disabled={!x || !y}
            className={cx('location')}
            onClick={x && y ? () => openMap({ x, y }) : undefined}
          >
            <FontAwesomeIcon icon={faLocationArrow} />
            {address}
          </button>
        )}
        {images.length > 0 && (
          <div className={cx('image_list')}>
            {images.map((image) => (
              <button key={image} className={cx('image')} onClick={openImage}>
                <Image src={image} layout="fill" objectFit="cover" alt="image" />
              </button>
            ))}
          </div>
        )}
      </div>

      <Modal visible={visibleMap} hasCloseButton isEscClosable isMaskClosable onClose={closeMap}>
        <StaticMap x={mapPosition?.x} y={mapPosition?.y} className={cx('location_map')} />
      </Modal>

      <ImageViewModal visible={visibleImage} images={images} onClose={closeImage} />
    </div>
  );
}

export default Place;
