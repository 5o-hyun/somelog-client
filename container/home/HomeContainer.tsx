import { getConnect } from '@lib/api/connect';
import { getMemos } from '@lib/api/memo';

import { Connect } from '@typess/connect';
import { Memos } from '@typess/memo';

import Anniversary from '@components/home/Anniversary';
import FloatButtons from '@components/home/FloatButtons';
import MemoList from '@components/home/MemoList';
import PhotoSlider from '@components/home/PhotoSlider';
import Profile from '@components/home/Profile';

import useAuthStore from '@/stores/auth';

import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

const HomeContainer = () => {
  const { user } = useAuthStore();
  const { data: connect } = useQuery<Connect>(
    ['connect', user?.id],
    () => getConnect(user?.id as number),
    { enabled: !!user },
  );
  const { data: memos } = useQuery<Memos>(
    ['memos', user?.id],
    () => getMemos(user?.id as number),
    { enabled: !!user },
  );

  return (
    <Container>
      <PhotoSlider connect={connect} />
      {connect?.DdayStatus === 'Y' && <Anniversary />}
      {connect?.feelStatus === 'Y' && <Profile />}
      <div className="border" />
      {connect?.memoStatus === 'Y' && <MemoList memos={memos} />}
      <FloatButtons />
    </Container>
  );
};

const Container = styled.div`
  .border {
    width: 100%;
    height: 1px;
    border: 1px dashed ${({ theme }) => theme.colors.gray[200]};
    margin-bottom: 20px;
  }
`;

export default HomeContainer;
