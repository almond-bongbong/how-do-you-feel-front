import React from 'react';
import classNames from 'classnames/bind';
import styles from './place-gallery.module.scss';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImageSlash } from '@fortawesome/pro-light-svg-icons';
import { range } from '@src/libs/util';

const cx = classNames.bind(styles);

interface Props {
  loading?: boolean;
  placeList: {
    id: number;
    thumbnailUrl?: string;
    city?: string | null;
  }[];
}

function PlaceGallery({ loading, placeList }: Props) {
  return (
    <div className={cx('container')}>
      <div className={cx('list')}>
        {loading &&
          range(0, 2).map((i) => (
            <div key={i} className={cx('item_wrap')}>
              <div className={cx('item', 'dummy')}>불러오는 중</div>
            </div>
          ))}
        {!loading &&
          placeList.map((place) => (
            <div key={place.id} className={cx('item_wrap')}>
              <div className={cx('item')}>
                {place.thumbnailUrl ? (
                  <Image src={place.thumbnailUrl} alt="썸네일" layout="fill" objectFit="cover" />
                ) : (
                  <div className={cx('default_image')}>
                    <FontAwesomeIcon icon={faImageSlash} />
                  </div>
                )}

                {place.city && <div className={cx('city')}>{place.city}</div>}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PlaceGallery;
