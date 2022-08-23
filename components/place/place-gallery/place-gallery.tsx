import React from 'react';
import classNames from 'classnames/bind';
import styles from './place-gallery.module.scss';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImageSlash } from '@fortawesome/pro-light-svg-icons';

const cx = classNames.bind(styles);

interface Props {
  placeList: {
    id: number;
    thumbnailUrl?: string;
    city?: string | null;
  }[];
}

function PlaceGallery({ placeList }: Props) {
  return (
    <div className={cx('container')}>
      <div className={cx('list')}>
        {placeList.map((place) => (
          <div key={place.id} className={cx('item')}>
            {place.thumbnailUrl ? (
              <Image src={place.thumbnailUrl} alt="썸네일" layout="fill" objectFit="cover" />
            ) : (
              <div className={cx('default_image')}>
                <FontAwesomeIcon icon={faImageSlash} />
              </div>
            )}

            {place.city && <div className={cx('city')}>{place.city}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlaceGallery;
