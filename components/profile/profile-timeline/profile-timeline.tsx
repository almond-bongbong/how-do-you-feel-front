import React from 'react';
import classNames from 'classnames/bind';
import styles from './profile-timeline.module.scss';
import Tab from '@src/components/common/form/tab';
import { useRouter } from 'next/router';
import { getHashString } from '@src/libs/url';
import MyPlaceList from '@src/components/profile/my-place-list';
import MyLikePlaceList from '@src/components/profile/my-like-place-list';

const cx = classNames.bind(styles);

function ProfileTimeline() {
  const router = useRouter();
  const selectedTab = getHashString(router.asPath) || 'place';

  if (!router.query.id || Array.isArray(router.query.id)) return <div>잘못된 접근입니다.</div>;

  return (
    <div className={cx('container')}>
      <Tab
        className={cx('profile_tab')}
        tabs={[
          { key: 'place', label: '장소' },
          { key: 'like', label: '좋아요' },
        ]}
        selectedTab={selectedTab}
        onChange={(key) => router.replace({ hash: key })}
      />

      {selectedTab === 'place' && <MyPlaceList accountId={router.query.id} />}
      {selectedTab === 'like' && <MyLikePlaceList accountId={router.query.id} />}
    </div>
  );
}

export default ProfileTimeline;
