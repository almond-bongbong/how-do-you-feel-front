import React from 'react';
import classNames from 'classnames/bind';
import styles from './profile-timeline.module.scss';
import Tab from '@src/components/common/form/tab';
import { useRouter } from 'next/router';
import MyPlaceList from '@src/components/profile/my-place-list';
import MyLikePlaceList from '@src/components/profile/my-like-place-list';
import MyBookmarkPlaceList from '@src/components/profile/my-bookmark-place-list';
import useCurrentUser from '@src/hooks/auth/use-current-user';

const cx = classNames.bind(styles);
const TABS = [
  { key: 'place', label: '나의 장소' },
  { key: 'bookmark', label: '저장소' },
  { key: 'like', label: '좋아요' },
];

interface Props {
  accountId: string;
  selectedTab?: typeof TABS[number]['key'];
}

function ProfileTimeline({ accountId, selectedTab = 'place' }: Props) {
  const { currentUser } = useCurrentUser();
  const isMe = currentUser?.id === accountId;
  const router = useRouter();
  const hasIdParam = router.query.id !== undefined;

  return (
    <div className={cx('container')}>
      <Tab
        className={cx('profile_tab')}
        tabs={TABS}
        selectedTab={selectedTab}
        onChange={(key) =>
          router.replace(
            {
              query: {
                ...(hasIdParam && { id: accountId }),
                tab: key,
              },
            },
            undefined,
            { shallow: true },
          )
        }
      />

      {selectedTab === 'place' && <MyPlaceList accountId={accountId} />}
      {selectedTab === 'bookmark' && <MyBookmarkPlaceList accountId={accountId} />}
      {selectedTab === 'like' && isMe && <MyLikePlaceList />}
    </div>
  );
}

export default ProfileTimeline;
