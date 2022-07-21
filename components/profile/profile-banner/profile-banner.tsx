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

const cx = classNames.bind(styles);

function ProfileBanner() {
  const { currentUser, refetchMe } = useCurrentUser();
  const [editProfileModalVisible, setEditProfileModalVisible] = useState(false);

  if (!currentUser) return <div>loading</div>;

  return (
    <div className={cx('container')}>
      <div className={cx('banner')}>
        {currentUser.bannerImage?.url && (
          <Image
            src={currentUser.bannerImage?.url}
            alt="사용자 배너 이미지"
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>

      <div className={cx('info')}>
        <div className={cx('photo')}>
          <ProfileImage src={currentUser.profileImage?.url} size={150} />
        </div>

        <div className={cx('user')}>
          <span className={cx('name')}>{currentUser.username}</span>
          {currentUser.location && (
            <span className={cx('location')}>
              <FontAwesomeIcon icon={faLocationDot} />
              {currentUser.location}
            </span>
          )}
        </div>

        {currentUser.bio && <div className={cx('bio')}>{currentUser.bio}</div>}

        <div className={cx('people')}>
          <span>0 팔로잉</span>
          <span>0 팔로워</span>
        </div>
        <Button
          className={cx('edit_button')}
          size="sm"
          onClick={() => setEditProfileModalVisible(true)}
        >
          수정하기
        </Button>
      </div>

      <EditProfileModal
        visible={editProfileModalVisible}
        onClose={() => setEditProfileModalVisible(false)}
        onSuccess={async () => {
          refetchMe?.();
          await Modal.alert('수정되었습니다.');
          setEditProfileModalVisible(false);
        }}
      />
    </div>
  );
}

export default ProfileBanner;
