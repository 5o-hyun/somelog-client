import { getConnect } from '@lib/api/connect';

import { Connect } from '@typess/connect';

import Anniversary from '@components/home/Anniversary';
import FloatButtons from '@components/home/FloatButtons';
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

  return (
    <Container>
      <PhotoSlider connect={connect} />
      {connect?.DdayStatus === 'Y' && <Anniversary />}
      {connect?.feelStatus === 'Y' && <Profile />}
      <div className="border" />
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
