import Anniversary from '@components/home/Anniversary';
import PhotoSlider from '@components/home/PhotoSlider';
import Profile from '@components/home/Profile';

import React from 'react';
import styled from 'styled-components';

const HomeContainer = () => {
  return (
    <Container>
      <PhotoSlider />
      <Anniversary />
      <Profile />
      <div className="border" />
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
