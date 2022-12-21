import React, { useCallback, useEffect, useRef, useState } from 'react';
import { loadKakaoMapScript } from '@src/libs/map';
import classNames from 'classnames/bind';
import styles from './place-map.module.scss';
import MapNavigator from '@src/components/map/map-navigator';
import { getCurrentUserLocation } from '@src/libs/geolocation';
import MapUtils from '@src/components/map/map-utils';
import CurrentLocationMarker from '@src/components/map/current-location-marker';
import usePlaceOnMap from '@src/hooks/map/use-place-on-map';
import PlaceMarker from '@src/components/map/place-marker';
import PlaceDetailModal from '@src/components/modal/place-detail-modal';
import { debounce } from '@src/libs/utils';
import { LATEST_LOCATION_KEY } from '@src/constants/keys';
import { LatestLocation } from '@src/types/location';
import { useRouter } from 'next/router';

const cx = classNames.bind(styles);
const DEFAULT_ZOOM_LEVEL = 4;

// 서울시청 좌표
const SEOUL_CENTER = {
  LATITUDE: 37.5659451195856,
  LONGITUDE: 126.97550018945496,
};

function PlaceMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const isLoadedRef = useRef(false);
  const router = useRouter();
  const { places, placesOnCurrentBounds } = usePlaceOnMap(map);
  const [zoomLevel, setZoomLevel] = useState(DEFAULT_ZOOM_LEVEL);

  const initMap = useCallback(async () => {
    if (!mapContainerRef.current || isLoadedRef.current) return;
    isLoadedRef.current = true;

    await loadKakaoMapScript();
    const savedLocation: LatestLocation = JSON.parse(
      localStorage.getItem(LATEST_LOCATION_KEY) || 'null',
    );
    const container = mapContainerRef.current;
    const options = {
      center: new window.kakao.maps.LatLng(
        savedLocation?.latitude || SEOUL_CENTER.LATITUDE,
        savedLocation?.longitude || SEOUL_CENTER.LONGITUDE,
      ),
      level: savedLocation?.zoom ?? DEFAULT_ZOOM_LEVEL,
    };

    setMap(new window.kakao.maps.Map(container, options));
    setZoomLevel(options.level);
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
    if (!map) return;

    const handleZoomChanged = () => setZoomLevel(map.getLevel());
    window.kakao.maps.event.addListener(map, 'zoom_changed', handleZoomChanged);

    return () => {
      window.kakao.maps.event.removeListener(map, 'zoom_changed', handleZoomChanged);
    };
  }, [map]);

  useEffect(() => {
    if (!map) return;

    const handleCenterChanged = debounce(() => {
      const zoom = map.getLevel();
      const center = map.getCenter();
      const location = {
        latitude: center.getLat(),
        longitude: center.getLng(),
        zoom,
      };
      localStorage.setItem(LATEST_LOCATION_KEY, JSON.stringify(location));
    }, 500);
    window.kakao.maps.event.addListener(map, 'center_changed', handleCenterChanged);
    return () => {
      window.kakao.maps.event.removeListener(map, 'center_changed', handleCenterChanged);
    };
  }, [map]);

  const onPlaceDetailClick = useCallback(
    (placeId: number) => {
      // href={{
      //   query: {
      //   ...router.query,
      //       placeId: place.id,
      //   },
      // }}
      // as={`/place/${place.id}`}
      // shallow
      router.push({
        query: {
          ...router.query,
          placeId,
        },
      });
    },
    [router],
  );

  const onBookmarkedFilterClick = useCallback(() => {
    router.push({
      query: {
        ...router.query,
        bookMarkedOnly: true,
      },
    });
  }, [router]);

  return (
    <div className={cx('place_map', `zoom_level_${zoomLevel}`)}>
      <MapNavigator
        map={map}
        places={placesOnCurrentBounds}
        onPlaceDetailClick={onPlaceDetailClick}
        onBookmarkedFilterClick={onBookmarkedFilterClick}
      />
      <MapUtils onClickMoveToCurrentUserLocation={moveToCurrentUserLocation} />
      <div id="map" className={cx('map')} ref={mapContainerRef} />
      {map && <CurrentLocationMarker map={map} />}
      {map &&
        placesOnCurrentBounds.map((place) => (
          <PlaceMarker
            key={place.id}
            map={map}
            place={place}
            onPlaceDetailClick={onPlaceDetailClick}
          />
        ))}

      <PlaceDetailModal
        visible={!!router.query.placeId}
        onClose={router.back}
        placeId={Number(router.query.placeId)}
      />
    </div>
  );
}

export default PlaceMap;
