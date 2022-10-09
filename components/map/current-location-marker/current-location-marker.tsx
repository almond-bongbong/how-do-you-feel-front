import { useEffect, useRef } from 'react';
import { watchUserLocation } from '@src/libs/geolocation';
import classNames from 'classnames/bind';
import styles from './current-location-marker.module.scss';
import CustomOverlay = kakao.maps.CustomOverlay;

const cx = classNames.bind(styles);

interface Props {
  map: kakao.maps.Map;
}

function CurrentLocationMarker({ map }: Props) {
  const currentLocationMarkerRef = useRef<CustomOverlay>();

  useEffect(() => {
    watchUserLocation((position) => {
      if (!map) return;

      const coords = new window.kakao.maps.LatLng(position.latitude, position.longitude);

      if (currentLocationMarkerRef.current) {
        currentLocationMarkerRef.current.setPosition(coords);
        return;
      }

      currentLocationMarkerRef.current = new window.kakao.maps.CustomOverlay({
        position: coords,
        content: `<div class="${cx('marker')}">현재위치</div>`,
      });
      currentLocationMarkerRef.current.setMap(map);
    });
  }, [map]);

  return null;
}

export default CurrentLocationMarker;
