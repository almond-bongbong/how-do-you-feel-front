import React, { useEffect, useState } from 'react';
import { Place } from '@src/generated/graphql';
import classNames from 'classnames/bind';
import styles from './place-marker.module.scss';
import { renderToString } from 'react-dom/server';
import Image from 'next/future/image';

const cx = classNames.bind(styles);

interface Props {
  map: kakao.maps.Map;
  place: Pick<Place, 'id' | 'name' | 'images' | 'latitude' | 'longitude'>;
  onClickPlaceDetail: (placeId: number) => void;
}

function PlaceMarker({ map, place, onClickPlaceDetail }: Props) {
  const [zoomLevel, setZoomLevel] = useState(map.getLevel());

  useEffect(() => {
    if (!place?.latitude || !place.longitude) return;

    const image = place.images?.[0]?.url;
    const overlayWrapper = document.createElement('div');
    overlayWrapper.className = cx('container');
    overlayWrapper.innerHTML = renderToString(
      <div className={cx('content')}>
        <div className={cx('thumbnail')}>
          {image && <Image src={image} width={100} height={100} alt="썸네일" />}
        </div>
        <div className={cx('name')}>{place.name}</div>
      </div>,
    );
    const handleClickOverlay = () => onClickPlaceDetail(place.id);
    overlayWrapper.addEventListener('click', handleClickOverlay);
    const overlay = new window.kakao.maps.CustomOverlay({
      content: overlayWrapper,
      position: new window.kakao.maps.LatLng(place.latitude, place.longitude),
      yAnchor: 1.2,
    });
    overlay.setMap(map);

    return () => {
      overlay.setMap(null);
      overlayWrapper.removeEventListener('click', handleClickOverlay);
    };
  }, [map, place, zoomLevel, onClickPlaceDetail]);

  useEffect(() => {
    const handleZoomChanged = () => setZoomLevel(map.getLevel());
    window.kakao.maps.event.addListener(map, 'zoom_changed', handleZoomChanged);

    return () => {
      window.kakao.maps.event.removeListener(map, 'zoom_changed', handleZoomChanged);
    };
  }, [map]);

  return null;
}

export default PlaceMarker;
