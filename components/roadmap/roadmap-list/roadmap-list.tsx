import React from 'react';
import classNames from 'classnames/bind';
import styles from './roadmap-list.module.scss';

const cx = classNames.bind(styles);

interface Props {
  items: {
    title: string;
    description: string;
    targetDate: string;
    isDone: boolean;
  }[];
}

function RoadmapList({ items }: Props) {
  return (
    <div className={cx('container')}>
      <h2>우리의 로드맵</h2>
      <ul className={cx('roadmap_list')}>
        {items.map((item) => (
          <li key={item.title}>
            <div className={cx('heading')}>
              <h3>{item.title}</h3>
              <div className={cx('target_date')}>{item.targetDate}</div>
            </div>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoadmapList;