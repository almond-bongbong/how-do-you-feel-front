import React from 'react';
import classNames from 'classnames/bind';
import styles from './timeline.module.scss';

const cx = classNames.bind(styles);

function Timeline() {
  return <div className={cx('timeline')}>timeline</div>;
}

export default Timeline;
