import DiaryGridContainer from '@container/diary/DiaryGridContainer';
import DiaryToolBarContainer from '@container/diary/DiaryToolBarContainer';

import Layout from '@components/base/Layout';
import Title from '@components/base/Title';

import React from 'react';

const index = () => {
  return (
    <Layout>
      <Title name="폴라로이드" />
      <DiaryToolBarContainer />
      <DiaryGridContainer />
    </Layout>
  );
};

export default index;
