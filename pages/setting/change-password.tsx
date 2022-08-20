import React from 'react';
import Layout from '@src/components/layout/layout';
import ChangePasswordForm from '@src/components/setting/change-password-form';

function ChangePassword() {
  return (
    <Layout title="비밀번호 변경" hasPrevButton>
      <ChangePasswordForm />
    </Layout>
  );
}

export default ChangePassword;
