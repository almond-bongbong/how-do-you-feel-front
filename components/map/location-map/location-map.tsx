import React, { useCallback, useEffect, useRef } from 'react';
import { loadKakaoMapScript } from '@src/libs/map';
import classNames from 'classnames/bind';
import styles from './location-map.module.scss';

const cx = classNames.bind(styles);

function LocationMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  const initMap = useCallback(async () => {
    if (!mapRef.current) return;

    await loadKakaoMapScript();
    const container = mapRef.current;
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);
  }, []);

  useEffect(() => {
    initMap();
  }, [initMap]);

  return (
    <div>
      <div id="map" className={cx('map')} ref={mapRef} />
    </div>
  );
}

export default LocationMap;
