import React, { useCallback, useEffect, useRef, useState } from 'react';
import { loadKakaoMapScript } from '@src/libs/map';
import classNames from 'classnames/bind';
import styles from './location-map.module.scss';
import MapNavigator from '@src/components/map/map-navigator';
import { getCurrentUserLocation } from '@src/libs/geolocation';
import MapUtils from '@src/components/map/map-utils';
import CurrentLocationMarker from '@src/components/map/current-location-marker';

const cx = classNames.bind(styles);

function LocationMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const isLoadedRef = useRef(false);

  const initMap = useCallback(async () => {
    if (!mapContainerRef.current || isLoadedRef.current) return;
    isLoadedRef.current = true;

    await loadKakaoMapScript();
    const container = mapContainerRef.current;
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    setMap(new window.kakao.maps.Map(container, options));
  }, []);

  useEffect(() => {
    initMap();
  }, [initMap]);

  const moveToCurrentUserLocation = useCallback(async () => {
    if (!map) return;

    const { longitude, latitude } = await getCurrentUserLocation();
    map.setCenter(new window.kakao.maps.LatLng(latitude, longitude));
  }, [map]);

  useEffect(() => {
    moveToCurrentUserLocation();
  }, [moveToCurrentUserLocation]);

  return (
    <div>
      <MapNavigator />
      <MapUtils onClickMoveToCurrentUserLocation={moveToCurrentUserLocation} />
      <div id="map" className={cx('map')} ref={mapContainerRef} />
      {map && <CurrentLocationMarker map={map} />}
    </div>
  );
}

export default LocationMap;
