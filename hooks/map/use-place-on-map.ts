import { useCallback, useEffect, useRef, useState } from 'react';
import { toArray, uniqBy } from '@fxts/core';
import { useGetBookmarkPlaceListLazyQuery, useGetPlaceListLazyQuery } from '@src/generated/graphql';
import { throttle } from '@src/libs/utils';
import { Coordinates } from '@src/types/location';
import useCurrentUser from '@src/hooks/auth/use-current-user';
import { useRouter } from 'next/router';

type PlaceItem = {
  id: number;
  name: string;
  content: string;
  address?: string | null;
  buildingName?: string | null;
  images?:
    | {
        key: string;
        url: string;
      }[]
    | null;
  latitude?: number | null;
  longitude?: number | null;
  likeCount: number;
  isBookmarked: boolean;
};

const DEFAULT_COORDINATES = { latitude: 0, longitude: 0 };

function usePlaceOnMap(map: kakao.maps.Map | null) {
  const router = useRouter();
  const bookMarkedOnly = router.query.bookMarkedOnly === 'true';
  const { currentUser } = useCurrentUser();
  const [getPlaceList, { called }] = useGetPlaceListLazyQuery();
  const [getBookMarkPlaceList, { called: bookmarkListCalled }] = useGetBookmarkPlaceListLazyQuery();
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
      if (bookMarkedOnly) {
        const { data } = await getBookMarkPlaceList({
          variables: {
            input: {
              accountId: currentUser?.id || '',
              bottomLeftPosition,
              topRightPosition,
            },
          },
        });
        queryResultItems = data?.getBookmarkPlaceList?.items ?? [];
      } else {
        const { data } = await getPlaceList({
          variables: {
            input: {
              bottomLeftPosition,
              topRightPosition,
            },
          },
        });
        queryResultItems = data?.getPlaceList?.items ?? [];
      }
      fetchedBottomLeft.current = bottomLeftPosition;
      fetchedTopRight.current = topRightPosition;
    }

    setPlaces((prev) => {
      const mergedItems = toArray(uniqBy((p) => p.id, [...prev, ...queryResultItems]));
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
      return mergedItems;
    });
  }, [map, getPlaceList, bookMarkedOnly, currentUser?.id, getBookMarkPlaceList]);

  useEffect(() => {
    if (!map) return;

    const throttledHandleBoundsChange = throttle(handleBoundsChange, 1000, { trailing: true });
    window.kakao.maps.event.addListener(map, 'bounds_changed', throttledHandleBoundsChange);

    return () => {
      window.kakao.maps.event.removeListener(map, 'bounds_changed', throttledHandleBoundsChange);
    };
  }, [map, handleBoundsChange]);

  useEffect(() => {
    if (!router.isReady || bookMarkedOnly) return;
    handleBoundsChange();
  }, [router.isReady, handleBoundsChange, bookMarkedOnly, called]);

  useEffect(() => {
    if (!router.isReady || !bookMarkedOnly) return;
    setPlaces([]);
    handleBoundsChange();
  }, [router.isReady, handleBoundsChange, bookMarkedOnly, bookmarkListCalled]);

  return { places, placesOnCurrentBounds };
}

export default usePlaceOnMap;
