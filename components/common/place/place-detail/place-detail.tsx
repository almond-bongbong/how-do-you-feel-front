import React from 'react';
import classNames from 'classnames/bind';
import styles from './place-detail.module.scss';
import ProfileImage from '@src/components/common/user/profile-image';
import { Swiper, SwiperSlide } from 'swiper/react';
import dayjs from 'dayjs';
import { useModal } from '@src/hooks/modal/use-modal';
import MapViewModal from '@src/components/modal/map-view-modal';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

const cx = classNames.bind(styles);

interface Props {
  content: string;
  createdAt: number;
  account: {
    id: string;
    username: string;
    profileUrl?: string;
  };
  location?: string | null;
  lng?: number | null;
  lat?: number | null;
  imageUrls?: string[];
}

function PlaceDetail({ content, createdAt, account, location, lng, lat, imageUrls }: Props) {
  const [visibleMapModal, openMapModal, closeMapModal] = useModal();
  const isThisYear = dayjs().year() === dayjs(createdAt).year();
  const dateText = isThisYear
    ? dayjs(createdAt).format('MM월 DD일')
    : dayjs(createdAt).format('YYYY년 MM월 DD일');
  const hasPosition = lng && lat;

  return (
    <div className={cx('container')}>
      <div className={cx('info')}>
        <div className={cx('main')}>
          <div className={cx('user')}>
            <ProfileImage size={44} src={account.profileUrl} className={cx('photo')} />
            <span className={cx('username')}>{account.username}</span>
          </div>
          {location && (
            <button
              type="button"
              className={cx('location')}
              disabled={!hasPosition}
              onClick={openMapModal}
            >
              {location}
            </button>
          )}
        </div>
        <div className={cx('extra')}>
          <div className={cx('date')}>{dateText}</div>
        </div>
      </div>

      <div className={cx('image_list')}>
        <Swiper pagination modules={[Pagination]}>
          {imageUrls?.map((url) => (
            <SwiperSlide key={url}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="image" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={cx('content')}>{content}</div>

      <MapViewModal
        visible={visibleMapModal}
        x={lng}
        y={lat}
        address={location}
        onClose={closeMapModal}
      />
    </div>
  );
}

export default PlaceDetail;
