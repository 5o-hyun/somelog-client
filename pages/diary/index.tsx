import DiaryGridContainer from '@container/diary/DiaryGridContainer';

import Layout from '@components/base/Layout';
import Title from '@components/base/Title';
import DiaryMainToolbar from '@components/diary/DiaryMainToolbar';

import React from 'react';

const index = () => {
  return (
    <Layout>
      <Title name="폴라로이드" />
      <DiaryMainToolbar />
      <DiaryGridContainer />
    </Layout>
  );
};

export default index;
