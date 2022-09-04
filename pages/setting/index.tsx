import React from 'react';
import Layout from '@src/components/layout/layout';
import SettingMenu from '@src/components/setting/setting-menu';

function Setting() {
  return (
    <Layout title="설정" hasContentType>
      <SettingMenu />
    </Layout>
  );
}

export default Setting;
