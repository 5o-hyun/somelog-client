import { getConnect } from '@lib/api/connect';

import DiaryGridContainer from '@container/diary/DiaryGridContainer';
import DiaryToolBarContainer from '@container/diary/DiaryToolBarContainer';

import Layout from '@components/base/Layout';
import Title from '@components/base/Title';

import useAuthStore from '@/stores/auth';

import { Empty } from 'antd';
import { Connect } from 'aws-sdk';
import React from 'react';
import { useQuery } from 'react-query';

const index = () => {
  const { user } = useAuthStore();

  const { data: connect } = useQuery<Connect>(
    ['connect', user?.id],
    () => getConnect(user?.id as number),
    { enabled: !!user },
  );

  return (
    <Layout>
      {connect ? (
        <>
          <Title name="폴라로이드" />
          <DiaryToolBarContainer />
          <DiaryGridContainer />
        </>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="커플 연결을 먼저 해주세요!"
        />
      )}
    </Layout>
  );
};

export default index;
