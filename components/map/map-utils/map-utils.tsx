import React from 'react';
import classNames from 'classnames/bind';
import styles from './map-utils.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationCrosshairs } from '@fortawesome/pro-light-svg-icons';

const cx = classNames.bind(styles);

interface Props {
  onClickMoveToCurrentUserLocation: () => void;
}

function MapUtils({ onClickMoveToCurrentUserLocation }: Props) {
  return (
    <div className={cx('container')}>
      <button type="button" onClick={onClickMoveToCurrentUserLocation}>
        <FontAwesomeIcon icon={faLocationCrosshairs} />
      </button>
    </div>
  );
}

export default MapUtils;
