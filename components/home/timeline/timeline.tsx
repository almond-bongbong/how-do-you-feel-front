import React from 'react';
import classNames from 'classnames/bind';
import styles from './timeline.module.scss';
import { GetPlaceListQuery } from '@src/generated/graphql';
import Place from '@src/components/place/place';
import { useApolloClient } from '@apollo/client';

const cx = classNames.bind(styles);

interface Props {
  placeList: GetPlaceListQuery['getPlaceList']['items'];
}

function Timeline({ placeList }: Props) {
  const apollo = useApolloClient();

  const handleDeletePlace = (placeId: number) => {
    const normalizedPlaceId = apollo.cache.identify({
      __typename: 'Place',
      id: placeId,
    });
    apollo.cache.evict({ id: normalizedPlaceId });
    apollo.cache.gc();
  };

  return (
    <div className={cx('timeline')}>
      {placeList.map((place) => (
        <Place key={place.id} place={place} onDelete={() => handleDeletePlace(place.id)} />
      ))}
    </div>
  );
}

export default Timeline;
