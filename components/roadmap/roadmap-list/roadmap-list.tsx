import React from 'react';
import classNames from 'classnames/bind';
import styles from './roadmap-list.module.scss';
import PageTitle from '@src/components/common/typography/page-title';

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
      <PageTitle>우리의 로드맵</PageTitle>
      <ul className={cx('roadmap_list')}>
        {items.map((item) => (
          <li key={item.title} className={cx({ done: item.isDone })}>
            <div className={cx('heading')}>
              {item.isDone && <span className={cx('tag')}>done</span>}
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
