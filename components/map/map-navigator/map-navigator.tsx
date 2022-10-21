import React from 'react';
import classNames from 'classnames/bind';
import styles from './map-navigator.module.scss';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHome } from '@fortawesome/pro-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/pro-light-svg-icons';
import { useRouter } from 'next/router';
import { Place } from '@src/generated/graphql';
import Image from 'next/future/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const cx = classNames.bind(styles);

interface Props {
  places: Pick<
    Place,
    'id' | 'name' | 'latitude' | 'longitude' | 'images' | 'address' | 'content' | 'likeCount'
  >[];
}

function MapNavigator({ places }: Props) {
  const router = useRouter();

  return (
    <div className={cx('container')}>
      <header className={cx('header')}>
        <button type="button" className={cx('prev_button')} onClick={router.back}>
          <FontAwesomeIcon icon={faChevronLeft} />
          이전 페이지로 이동
        </button>
        <h1 className={cx('logo')}>
          <Link href="/">
            <a>
              <FontAwesomeIcon icon={faHome} />
            </a>
          </Link>
        </h1>
      </header>

      <article className={cx('content')}>
        <ul className={cx('place_list')}>
          {places.map((place) => (
            <li key={place.id}>
              {place.images && place.images?.length > 0 && (
                <Swiper className={cx('images')} spaceBetween={2}>
                  {place.images.map((image, i) => (
                    <SwiperSlide
                      key={image.key}
                      className={cx('image', {
                        has_more: i === 0 && place.images && place.images?.length > 1,
                      })}
                    >
                      <Image src={image.url} width={300} height={200} alt="image thumbnail" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
              <div className={cx('name')}>{place.name}</div>
              <div className={cx('description')}>{place.content}</div>
              <div className={cx('address')}>{place.address}</div>
              <div className={cx('info_area')}>
                <span className={cx('like')}>
                  <FontAwesomeIcon icon={faHeart} />
                  {place.likeCount}명이 좋아해요
                </span>
                <span className={cx('bookmark')}>{/*<FontAwesomeIcon icon={fa}*/}</span>
              </div>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}

export default MapNavigator;
