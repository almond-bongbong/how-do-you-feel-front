import React, { useCallback, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './static-map.module.scss';
import { loadKakaoMapScript } from '@src/libs/map';

const cx = classNames.bind(styles);

interface Props {
  x?: number | null;
  y?: number | null;
  className?: string;
}

function StaticMap({ x, y, className }: Props) {
  const mapElementRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<kakao.maps.Map>();

  const initMap = useCallback(async () => {
    if (!mapElementRef.current || mapRef.current || !x || !y) return;

    await loadKakaoMapScript();
    mapRef.current = new window.kakao.maps.Map(mapElementRef.current, {
      center: new window.kakao.maps.LatLng(y, x),
    });
    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(y, x),
    });
    marker.setMap(mapRef.current);
  }, [x, y]);

  useEffect(() => {
    initMap();
  }, [initMap]);

  return (
    <div className={cx('container', className)}>
      <div ref={mapElementRef} className={cx('map')}>
        {!x || !y ? '위치를 선택해주세요.' : ''}
      </div>
    </div>
  );
}

export default StaticMap;
