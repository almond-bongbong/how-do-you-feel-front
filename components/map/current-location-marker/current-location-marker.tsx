import { useEffect, useRef } from 'react';
import { watchUserLocation } from '@src/libs/geolocation';
import classNames from 'classnames/bind';
import styles from './current-location-marker.module.scss';

const cx = classNames.bind(styles);

interface Props {
  map: kakao.maps.Map;
}

function CurrentLocationMarker({ map }: Props) {
  const currentLocationMarkerRef = useRef();

  useEffect(() => {
    watchUserLocation((position) => {
      if (!map) return;

      const marker =
        currentLocationMarkerRef.current ??
        new window.kakao.maps.CustomOverlay({
          position: new window.kakao.maps.LatLng(position.latitude, position.longitude),
          content: `<div class="${cx('marker')}">현재위치</div>`,
        });

      console.log(map);

      marker.setMap(map);
    });
  }, [map]);

  return null;
}

export default CurrentLocationMarker;
