import React from 'react';
import Layout from '@src/components/layout/layout';
import ProfileBanner from '@src/components/profile/profile-banner';

function Profile() {
  return (
    <Layout>
      <ProfileBanner />
    </Layout>
  );
}

Profile.isPrivatePage = true;

export default Profile;
