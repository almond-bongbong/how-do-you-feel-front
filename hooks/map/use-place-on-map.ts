import { useCallback, useEffect, useRef, useState } from 'react';
import { toArray, uniqBy } from '@fxts/core';
import { GetPlaceListQuery, useGetPlaceListLazyQuery } from '@src/generated/graphql';
import { throttle } from '@src/libs/utils';
import { Coordinates } from '@src/types/location';

type PlaceItem = GetPlaceListQuery['getPlaceList']['items'][0];

const DEFAULT_COORDINATES = { latitude: 0, longitude: 0 };

function usePlaceOnMap(map: kakao.maps.Map | null) {
  const [getPlaceListByLocation, { called }] = useGetPlaceListLazyQuery();
  const [places, setPlaces] = useState<PlaceItem[]>([]);
  const [placesOnCurrentBounds, setPlacesOnCurrentBounds] = useState<PlaceItem[]>([]);
  const fetchedBottomLeft = useRef<Coordinates>(DEFAULT_COORDINATES);
  const fetchedTopRight = useRef<Coordinates>(DEFAULT_COORDINATES);

  const handleBoundsChange = useCallback(async () => {
    if (!map) return;

    const bounds = map.getBounds();
    const bottomLeftPosition = {
      latitude: bounds.getSouthWest().getLat(),
      longitude: bounds.getSouthWest().getLng(),
    };
    const topRightPosition = {
      latitude: bounds.getNorthEast().getLat(),
      longitude: bounds.getNorthEast().getLng(),
    };

    const isAlreadyFetchedBounds =
      fetchedBottomLeft.current.latitude < bottomLeftPosition.latitude &&
      fetchedBottomLeft.current.longitude < bottomLeftPosition.longitude &&
      fetchedTopRight.current?.latitude > topRightPosition.latitude &&
      fetchedTopRight.current?.longitude > topRightPosition.longitude;

    let queryResultItems: PlaceItem[] = [];
    if (!isAlreadyFetchedBounds) {
      const { data } = await getPlaceListByLocation({
        variables: {
          input: {
            bottomLeftPosition,
            topRightPosition,
          },
        },
      });
      fetchedBottomLeft.current = bottomLeftPosition;
      fetchedTopRight.current = topRightPosition;
      queryResultItems = data?.getPlaceList?.items ?? [];
    }

    const mergedItems = toArray(uniqBy((p) => p.id, [...places, ...queryResultItems]));
    setPlaces(mergedItems);

    const placesOnCurrentBounds = mergedItems.filter(
      (place) =>
        place.latitude &&
        place.longitude &&
        place.latitude >= bottomLeftPosition.latitude &&
        place.latitude <= topRightPosition.latitude &&
        place.longitude >= bottomLeftPosition.longitude &&
        place.longitude <= topRightPosition.longitude,
    );
    setPlacesOnCurrentBounds(placesOnCurrentBounds);
  }, [map, places, getPlaceListByLocation]);

  useEffect(() => {
    if (!map) return;

    const throttledHandleBoundsChange = throttle(handleBoundsChange, 1000, { trailing: true });
    window.kakao.maps.event.addListener(map, 'bounds_changed', throttledHandleBoundsChange);

    return () => {
      window.kakao.maps.event.removeListener(map, 'bounds_changed', throttledHandleBoundsChange);
    };
  }, [map, handleBoundsChange]);

  useEffect(() => {
    if (called) return;
    handleBoundsChange();
  }, [handleBoundsChange, called]);

  return { places, placesOnCurrentBounds };
}

export default usePlaceOnMap;
