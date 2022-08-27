import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './profile-banner.module.scss';
import Image from 'next/image';
import ProfileImage from '@src/components/common/user/profile-image';
import useCurrentUser from '@src/hooks/auth/use-current-user';
import Button from '@src/components/common/form/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/pro-light-svg-icons';
import EditProfileModal from '@src/components/modal/edit-profile-modal';
import Modal from '@src/components/modal/modal';
import { useToggleFollowMutation } from '@src/generated/graphql';
import { GET_PROFILE_QUERY } from '@src/graphql/account/get-profile';

const cx = classNames.bind(styles);

interface Props {
  id: string;
  bannerImage?: string | null;
  profileImage?: string | null;
  username: string;
  location?: string | null;
  bio?: string | null;
  followingCount: number;
  followedByCount: number;
  isFollowed?: boolean;
}

function ProfileBanner({
  id,
  bannerImage,
  profileImage,
  username,
  location,
  bio,
  followingCount,
  followedByCount,
  isFollowed = false,
}: Props) {
  const [toggleFollowMutation, { loading: loadingToggleFollow }] = useToggleFollowMutation({
    variables: { input: { id } },
    refetchQueries: [{ query: GET_PROFILE_QUERY, variables: { input: { id } } }],
  });
  const { currentUser, refetchMe } = useCurrentUser();
  const [editProfileModalVisible, setEditProfileModalVisible] = useState(false);
  const isMe = id === currentUser?.id;

  const handleClickFollow = async () => {
    try {
      await toggleFollowMutation();
    } catch (error) {
      console.error(error);
      await Modal.alert('요청에 실패했습니다.');
    }
  };

  return (
    <div className={cx('container')}>
      <div className={cx('banner')}>
        {bannerImage && (
          <Image
            src={bannerImage}
            alt="사용자 배너 이미지"
            priority
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>

      <div className={cx('info')}>
        <div className={cx('photo')}>
          <ProfileImage src={profileImage} size={150} />
        </div>

        <div className={cx('user')}>
          <span className={cx('name')}>{username}</span>
          {location && (
            <span className={cx('location')}>
              <FontAwesomeIcon icon={faLocationDot} />
              {location}
            </span>
          )}
        </div>

        {bio && <div className={cx('bio')}>{bio}</div>}

        <div className={cx('people')}>
          <span>{followingCount} 팔로잉</span>
          <span>{followedByCount} 팔로워</span>
        </div>
        {isMe ? (
          <Button
            className={cx('profile_button')}
            size="sm"
            onClick={() => setEditProfileModalVisible(true)}
          >
            수정하기
          </Button>
        ) : (
          <Button
            className={cx('profile_button')}
            size="sm"
            theme={isFollowed ? 'default' : 'primary-line'}
            loading={loadingToggleFollow}
            onClick={handleClickFollow}
          >
            {isFollowed ? '언팔로우' : '팔로우'}
          </Button>
        )}
      </div>

      {isMe && (
        <EditProfileModal
          visible={editProfileModalVisible}
          onClose={() => setEditProfileModalVisible(false)}
          onSuccess={async () => {
            refetchMe?.();
            await Modal.alert('수정되었습니다.');
            setEditProfileModalVisible(false);
          }}
        />
      )}
    </div>
  );
}

export default ProfileBanner;
