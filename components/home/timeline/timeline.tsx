import React from 'react';
import classNames from 'classnames/bind';
import styles from './timeline.module.scss';
import { GetPlaceListQuery } from '@src/generated/graphql';
import Place from '@src/components/place/place';

const cx = classNames.bind(styles);

interface Props {
  placeList: GetPlaceListQuery['getPlaceList']['items'];
}

function Timeline({ placeList }: Props) {
  return (
    <div className={cx('timeline')}>
      {placeList.map((place) => (
        <Place key={place.id} place={place} />
      ))}
    </div>
  );
}

export default Timeline;
