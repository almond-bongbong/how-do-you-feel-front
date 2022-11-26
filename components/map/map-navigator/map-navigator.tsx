import React from 'react';
import classNames from 'classnames/bind';
import styles from './map-navigator.module.scss';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHome, faMap } from '@fortawesome/pro-solid-svg-icons';
import { faChevronLeft, faFaceSadTear } from '@fortawesome/pro-light-svg-icons';
import { useRouter } from 'next/router';
import Image from 'next/future/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Place } from '@src/generated/graphql';

const cx = classNames.bind(styles);

type PlaceItem = Pick<
  Place,
  'id' | 'name' | 'latitude' | 'longitude' | 'images' | 'address' | 'content' | 'likeCount'
>;

interface Props {
  map: kakao.maps.Map | null;
  places: PlaceItem[];
  onClickPlaceDetail: (placeId: number) => void;
}

function MapNavigator({ map, places, onClickPlaceDetail }: Props) {
  const router = useRouter();

  const handleClickPlaceAddress = (place: PlaceItem) => {
    if (!map || !place.latitude || !place.longitude) return;

    const position = new window.kakao.maps.LatLng(place.latitude, place.longitude);
    map.panTo(position);
  };

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
          {places.length === 0 && (
            <div className={cx('empty')}>
              <div className={cx('icon')}>
                <FontAwesomeIcon icon={faFaceSadTear} />
              </div>
              아직 괜찮은 장소를 찾지 못했어요.
            </div>
          )}
          {places.map((place) => (
            <li key={place.id}>
              <div className={cx('inner')}>
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
                <button
                  className={cx('detail_trigger')}
                  type="button"
                  onClick={() => onClickPlaceDetail(place.id)}
                >
                  <div className={cx('name')}>{place.name}</div>
                  <div className={cx('description')}>{place.content}</div>
                </button>
                <button
                  className={cx('address')}
                  type="button"
                  onClick={() => handleClickPlaceAddress(place)}
                >
                  <FontAwesomeIcon icon={faMap} />
                  {place.address}
                </button>
                <div className={cx('info_area')}>
                  <span className={cx('like')}>
                    <FontAwesomeIcon icon={faHeart} />
                    {place.likeCount}명이 좋아해요
                  </span>
                  <span className={cx('bookmark')}>{/*<FontAwesomeIcon icon={fa}*/}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}

export default MapNavigator;
