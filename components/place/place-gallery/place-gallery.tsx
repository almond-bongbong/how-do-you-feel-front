import React from 'react';
import classNames from 'classnames/bind';
import styles from './place-gallery.module.scss';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImageSlash } from '@fortawesome/pro-light-svg-icons';
import { useModal } from '@src/hooks/modal/use-modal';
import PlaceDetailModal from '@src/components/modal/place-detail-modal';
import { map, pipe, range, toArray } from '@fxts/core';

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
  const [visibleDetail, openDetail, closeDetail, detailPlaceId] = useModal<number>(false);

  return (
    <div className={cx('container')}>
      <div className={cx('list')}>
        {loading &&
          pipe(
            range(0, 3),
            map((i) => (
              <div key={i} className={cx('item_wrap')}>
                <div className={cx('item', 'dummy')}>불러오는 중</div>
              </div>
            )),
            toArray,
          )}
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

                <button
                  type="button"
                  className={cx('view_detail')}
                  onClick={() => openDetail(place.id)}
                >
                  자세히보기
                </button>
              </div>
            </div>
          ))}
      </div>

      {detailPlaceId && (
        <PlaceDetailModal visible={visibleDetail} placeId={detailPlaceId} onClose={closeDetail} />
      )}
    </div>
  );
}

export default PlaceGallery;
