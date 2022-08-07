import React from 'react';
import Layout from '@src/components/layout/layout';
import ProfileBanner from '@src/components/profile/profile-banner';
import useCurrentUser from '@src/hooks/auth/use-current-user';

function Profile() {
  const { currentUser } = useCurrentUser();

  if (!currentUser) return <div>loading</div>;

  return (
    <Layout>
      <ProfileBanner
        id={currentUser.id}
        bannerImage={currentUser?.bannerImage?.url}
        profileImage={currentUser?.profileImage?.url}
        username={currentUser.username}
        location={currentUser.location}
        bio={currentUser.bio}
      />
    </Layout>
  );
}

Profile.isPrivatePage = true;

export default Profile;
