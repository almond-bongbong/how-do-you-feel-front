import React from 'react';
import classNames from 'classnames/bind';
import styles from './profile-timeline.module.scss';
import Tab from '@src/components/common/form/tab';
import { useRouter } from 'next/router';
import { getHashString } from '@src/libs/url';
import MyPlaceList from '@src/components/profile/my-place-list';
import MyLikePlaceList from '@src/components/profile/my-like-place-list';
import MyBookmarkPlaceList from '@src/components/profile/my-bookmark-place-list';

const cx = classNames.bind(styles);
const TABS = [
  { key: 'place', label: '나의 장소' },
  { key: 'bookmark', label: '저장된' },
  { key: 'like', label: '좋아요' },
];

interface Props {
  accountId: string;
}

function ProfileTimeline({ accountId }: Props) {
  const router = useRouter();
  const [firstTab] = TABS;
  const selectedTab = getHashString(router.asPath) || firstTab.key;

  return (
    <div className={cx('container')}>
      <Tab
        className={cx('profile_tab')}
        tabs={TABS}
        selectedTab={selectedTab}
        onChange={(key) => router.replace({ hash: key })}
      />

      {selectedTab === 'place' && <MyPlaceList accountId={accountId} />}
      {selectedTab === 'bookmark' && <MyBookmarkPlaceList accountId={accountId} />}
      {selectedTab === 'like' && <MyLikePlaceList accountId={accountId} />}
    </div>
  );
}

export default ProfileTimeline;
