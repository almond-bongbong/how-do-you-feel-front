import React, { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './place.module.scss';
import ProfileImage from '@src/components/common/user/profile-image';
import useIsomorphicLayoutEffect from '@src/hooks/common/use-isomorphic-layout-effect';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/pro-solid-svg-icons';
import Modal from '@src/components/modal/modal/modal';
import StaticMap from '@src/components/common/map/static-map';
import { useModal } from '@src/hooks/modal/use-modal';

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

const CONTENT_LINE_HEIGHT = 22;
const CONTENT_MAX_HEIGHT = CONTENT_LINE_HEIGHT * 4;

function Place({ profileImage, username, content, address, x, y, images }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOverflowContent, setIsOverflowContent] = useState(false);
  const [visibleMap, openMap, closeMap, mapPosition] = useModal<{ x: number; y: number } | null>(
    false,
  );

  useIsomorphicLayoutEffect(() => {
    if (!contentRef.current) return;
    setIsOverflowContent(contentRef.current.clientHeight > CONTENT_MAX_HEIGHT);
  }, []);

  return (
    <div className={cx('container')}>
      <ProfileImage size={48} src={profileImage} className={cx('profile_image')} />
      <div className={cx('content_area')}>
        <div className={cx('username')}>{username}</div>
        <div className={cx('content_wrap', { overflow: isOverflowContent })}>
          <div ref={contentRef} className={cx('content')}>
            {content}
          </div>
        </div>
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
              <div key={image} className={cx('image')}>
                <Image src={image} layout="fill" objectFit="cover" alt="image" />
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal visible={visibleMap} hasCloseButton isEscClosable isMaskClosable onClose={closeMap}>
        <StaticMap x={mapPosition?.x} y={mapPosition?.y} className={cx('location_map')} />
      </Modal>
    </div>
  );
}

export default Place;
