import React, { useEffect } from 'react';
import { Place } from '@src/generated/graphql';
import classNames from 'classnames/bind';
import styles from './place-marker.module.scss';
import { renderToString } from 'react-dom/server';
import Image from 'next/future/image';

const cx = classNames.bind(styles);

interface Props {
  map: kakao.maps.Map;
  place: Pick<Place, 'name' | 'images' | 'latitude' | 'longitude'>;
}

function PlaceMarker({ map, place }: Props) {
  useEffect(() => {
    if (!place?.latitude || !place.longitude) return;

    const image = place.images?.[0]?.url;
    const overlay = new window.kakao.maps.CustomOverlay({
      content: renderToString(
        <div className={cx('container')}>
          <div className={cx('thumbnail')}>
            {image && <Image src={image} width={100} height={100} alt="썸네일" />}
          </div>
          <div className={cx('name')}>{place.name}</div>
        </div>,
      ),
      position: new window.kakao.maps.LatLng(place.latitude, place.longitude),
      yAnchor: 1.2,
    });
    overlay.setMap(map);

    return () => {
      overlay.setMap(null);
    };
  }, [map, place]);

  return null;
}

export default PlaceMarker;
