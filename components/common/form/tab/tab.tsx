import React from 'react';
import classNames from 'classnames/bind';
import styles from './tab.module.scss';

const cx = classNames.bind(styles);

interface Props {
  tabs: {
    key: string;
    label: string;
  }[];
  selectedTab: string;
  className?: string;
  onChange: (key: string) => void;
}

function Tab({ tabs, selectedTab, className, onChange }: Props) {
  return (
    <div className={cx('container', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          className={cx('tab', { active: selectedTab === tab.key })}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default Tab;
