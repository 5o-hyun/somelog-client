import { getConnect } from '@lib/api/connect';

import MemoGridContainer from '@container/memo/MemoGridContainer';

import Layout from '@components/base/Layout';

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
        <MemoGridContainer />
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
