import { useCallback, useEffect, useState } from 'react';
import { throttle } from '@src/libs/utils';
import {
  GetPlaceListByLocationQuery,
  useGetPlaceListByLocationLazyQuery,
} from '@src/generated/graphql';
import { toArray, uniqBy } from '@fxts/core';

type PlaceItem = GetPlaceListByLocationQuery['getPlaceListByLocation']['items'][0];

function usePlaceOnMap(map: kakao.maps.Map | null) {
  const [places, setPlaces] = useState<PlaceItem[]>([]);
  const [getPlaceListByLocation] = useGetPlaceListByLocationLazyQuery();

  const handleBoundsChange = useCallback(async () => {
    if (!map) return;

    const bounds = map.getBounds();
    const { data } = await getPlaceListByLocation({
      variables: {
        input: {
          bottomLeftPosition: {
            latitude: bounds.getSouthWest().getLat(),
            longitude: bounds.getSouthWest().getLng(),
          },
          topRightPosition: {
            latitude: bounds.getNorthEast().getLat(),
            longitude: bounds.getNorthEast().getLng(),
          },
        },
      },
    });
    const items = data?.getPlaceListByLocation?.items ?? [];
    setPlaces((prev) => toArray(uniqBy((p) => p.id, [...prev, ...items])));
  }, [map, getPlaceListByLocation]);

  useEffect(() => {
    if (!map) return;

    window.kakao.maps.event.addListener(
      map,
      'bounds_changed',
      throttle(handleBoundsChange, 1000, { trailing: true }),
    );
  }, [map, handleBoundsChange]);

  useEffect(() => {
    handleBoundsChange();
  }, [handleBoundsChange]);

  return { places };
}

export default usePlaceOnMap;
