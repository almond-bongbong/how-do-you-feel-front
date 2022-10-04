import { useCallback, useEffect } from 'react';
import { throttle } from '@src/libs/utils';

function usePlaceOnMap(map: kakao.maps.Map | null) {
  const handleBoundsChange = useCallback(() => {
    if (!map) return;

    const bounds = map.getBounds();
    console.log(bounds.getSouthWest().toString(), bounds.getNorthEast().toString());
  }, [map]);

  useEffect(() => {
    if (!map) return;

    window.kakao.maps.event.addListener(
      map,
      'bounds_changed',
      throttle(handleBoundsChange, 1000, { trailing: true }),
    );
  }, [map, handleBoundsChange]);

  return {};
}

export default usePlaceOnMap;
