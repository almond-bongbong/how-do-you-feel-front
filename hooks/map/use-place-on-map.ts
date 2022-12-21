import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useGetBookmarkPlaceListLazyQuery, useGetPlaceListLazyQuery } from '@src/generated/graphql';
import { throttle } from '@src/libs/utils';
import { Coordinates } from '@src/types/location';
import useCurrentUser from '@src/hooks/auth/use-current-user';
import { useRouter } from 'next/router';
import { toArray, uniqBy } from '@fxts/core';

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
  const [getPlaceList] = useGetPlaceListLazyQuery();
  const [getBookMarkPlaceList] = useGetBookmarkPlaceListLazyQuery();
  const [places, setPlaces] = useState<PlaceItem[]>([]);
  const fetchedBottomLeft = useRef<Coordinates>(DEFAULT_COORDINATES);
  const fetchedTopRight = useRef<Coordinates>(DEFAULT_COORDINATES);
  const [currentBounds, setCurrentBounds] = useState<kakao.maps.LatLngBounds | null>(null);

  const placesOnCurrentBounds = useMemo(() => {
    if (!currentBounds) return [];

    return places.filter(
      (place) =>
        (bookMarkedOnly ? place.isBookmarked : true) &&
        place.latitude &&
        place.longitude &&
        place.latitude >= currentBounds.getSouthWest().getLat() &&
        place.latitude <= currentBounds.getNorthEast().getLat() &&
        place.longitude >= currentBounds.getSouthWest().getLng() &&
        place.longitude <= currentBounds.getNorthEast().getLng(),
    );
  }, [currentBounds, bookMarkedOnly, places]);

  const fetchPlaces = useCallback(async () => {
    if (!currentBounds) return;

    const isAlreadyFetchedBounds =
      fetchedBottomLeft.current.latitude < currentBounds.getSouthWest().getLat() &&
      fetchedBottomLeft.current.longitude < currentBounds.getSouthWest().getLng() &&
      fetchedTopRight.current?.latitude > currentBounds.getNorthEast().getLat() &&
      fetchedTopRight.current?.longitude > currentBounds.getNorthEast().getLng();

    let queryResultItems: PlaceItem[] = [];
    if (!isAlreadyFetchedBounds) {
      const boundsParams = {
        bottomLeftPosition: {
          latitude: currentBounds.getSouthWest().getLat(),
          longitude: currentBounds.getSouthWest().getLng(),
        },
        topRightPosition: {
          latitude: currentBounds.getNorthEast().getLat(),
          longitude: currentBounds.getNorthEast().getLng(),
        },
      };

      if (bookMarkedOnly) {
        const { data } = await getBookMarkPlaceList({
          variables: {
            input: {
              accountId: currentUser?.id || '',
              ...boundsParams,
            },
          },
        });
        queryResultItems = data?.getBookmarkPlaceList?.items ?? [];
      } else {
        const { data } = await getPlaceList({
          variables: {
            input: { ...boundsParams },
          },
        });
        queryResultItems = data?.getPlaceList?.items ?? [];
      }
      fetchedBottomLeft.current = boundsParams.bottomLeftPosition;
      fetchedTopRight.current = boundsParams.topRightPosition;
    }

    setPlaces((prev) => toArray(uniqBy((p) => p.id, [...prev, ...queryResultItems])));
  }, [bookMarkedOnly, currentBounds, currentUser?.id, getBookMarkPlaceList, getPlaceList]);

  const handleBoundsChange = useCallback(async () => {
    if (!map) return;

    const bounds = map.getBounds();
    setCurrentBounds(bounds);
  }, [map]);

  useEffect(() => {
    if (!router.isReady) return;
    fetchPlaces();
  }, [router.isReady, fetchPlaces]);

  useEffect(() => {
    if (!map) return;

    const throttledHandleBoundsChange = throttle(handleBoundsChange, 1000, { trailing: true });
    window.kakao.maps.event.addListener(map, 'bounds_changed', throttledHandleBoundsChange);
    setCurrentBounds(map.getBounds());

    return () => {
      window.kakao.maps.event.removeListener(map, 'bounds_changed', throttledHandleBoundsChange);
    };
  }, [map, handleBoundsChange]);

  return { places, placesOnCurrentBounds };
}

export default usePlaceOnMap;
