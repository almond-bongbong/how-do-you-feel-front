import React, { useCallback, useEffect, useRef } from 'react';
import { loadKakaoMapScript } from '@src/libs/map';
import classNames from 'classnames/bind';
import styles from './location-map.module.scss';
import MapNavigator from '@src/components/map/map-navigator';
import { getCurrentUserLocation, watchUserLocation } from '@src/libs/geolocation';
import MapUtils from '@src/components/map/map-utils';

const cx = classNames.bind(styles);

function LocationMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<kakao.maps.Map>();
  const currentLocationMarkerRef = useRef<kakao.maps.CustomOverlay>();
  const isLoadedRef = useRef(false);

  const initMap = useCallback(async () => {
    if (!mapContainerRef.current || isLoadedRef.current || mapRef.current) return;
    isLoadedRef.current = true;

    await loadKakaoMapScript();
    const container = mapContainerRef.current;
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    mapRef.current = new window.kakao.maps.Map(container, options);
  }, []);

  useEffect(() => {
    initMap();
  }, [initMap]);

  const moveToCurrentUserLocation = useCallback(async () => {
    const { longitude, latitude } = await getCurrentUserLocation();
    mapRef.current?.setCenter(new window.kakao.maps.LatLng(latitude, longitude));
  }, []);

  useEffect(() => {
    moveToCurrentUserLocation();
  }, [moveToCurrentUserLocation]);

  useEffect(() => {
    watchUserLocation((position) => {
      if (!mapRef.current) return;

      const marker =
        currentLocationMarkerRef.current ??
        new window.kakao.maps.CustomOverlay({
          position: new window.kakao.maps.LatLng(position.latitude, position.longitude),
          content: `<div class="${cx('current_user')}">현재위치</div>`,
        });

      marker.setMap(mapRef.current);
    });
  }, []);

  return (
    <div>
      <MapNavigator />
      <MapUtils onClickMoveToCurrentUserLocation={moveToCurrentUserLocation} />
      <div id="map" className={cx('map')} ref={mapContainerRef} />
    </div>
  );
}

export default LocationMap;
