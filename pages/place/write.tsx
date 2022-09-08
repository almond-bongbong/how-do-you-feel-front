import React from 'react';
import Layout from '@src/components/layout/layout';
import WritePlaceForm from '@src/components/place/write-place-form';

function Write() {
  return (
    <Layout title="글 작성하기">
      <WritePlaceForm />
    </Layout>
  );
}

export default Write;
