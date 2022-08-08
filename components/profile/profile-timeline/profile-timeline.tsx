import React from 'react';
import classNames from 'classnames/bind';
import styles from './profile-timeline.module.scss';
import Tab from '@src/components/common/form/tab';
import { useRouter } from 'next/router';
import { getHashString } from '@src/libs/url';

const cx = classNames.bind(styles);

function ProfileTimeline() {
  const router = useRouter();
  const selectedTab = getHashString(router.asPath) || 'place';

  console.log(selectedTab);

  return (
    <div className={cx('container')}>
      <Tab
        tabs={[
          { key: 'place', label: '장소' },
          { key: 'like', label: '좋아요' },
        ]}
        selectedTab={selectedTab}
        onChange={(key) => router.replace({ hash: key })}
      />
    </div>
  );
}

export default ProfileTimeline;
