import React, { useCallback, useEffect, useRef, useState } from 'react';
import { loadKakaoMapScript } from '@src/libs/map';
import classNames from 'classnames/bind';
import styles from './location-map.module.scss';
import MapNavigator from '@src/components/map/map-navigator';
import { getCurrentUserLocation } from '@src/libs/geolocation';
import MapUtils from '@src/components/map/map-utils';
import CurrentLocationMarker from '@src/components/map/current-location-marker';
import usePlaceOnMap from '@src/hooks/map/use-place-on-map';
import PlaceMarker from '@src/components/map/place-marker';

const cx = classNames.bind(styles);
const DEFAULT_ZOOM_LEVEL = 4;

function LocationMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const isLoadedRef = useRef(false);
  const { places } = usePlaceOnMap(map);
  const [zoomLevel, setZoomLevel] = useState(DEFAULT_ZOOM_LEVEL);

  const initMap = useCallback(async () => {
    if (!mapContainerRef.current || isLoadedRef.current) return;
    isLoadedRef.current = true;

    await loadKakaoMapScript();
    const container = mapContainerRef.current;
    const options = {
      center: new window.kakao.maps.LatLng(37.557701, 126.911667),
      level: DEFAULT_ZOOM_LEVEL,
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

  // useEffect(() => {
  // moveToCurrentUserLocation();
  // }, [moveToCurrentUserLocation]);

  useEffect(() => {
    if (!map) return;

    const handleZoomChanged = () => setZoomLevel(map.getLevel());
    window.kakao.maps.event.addListener(map, 'zoom_changed', handleZoomChanged);

    return () => {
      window.kakao.maps.event.removeListener(map, 'zoom_changed', handleZoomChanged);
    };
  }, [map]);

  return (
    <div className={`zoom_level_${zoomLevel}`}>
      <MapNavigator />
      <MapUtils onClickMoveToCurrentUserLocation={moveToCurrentUserLocation} />
      <div id="map" className={cx('map')} ref={mapContainerRef} />
      {map && <CurrentLocationMarker map={map} />}
      {map && places.map((place) => <PlaceMarker key={place.id} map={map} place={place} />)}
    </div>
  );
}

export default LocationMap;
