import DiaryGrid from '@components/diary/DiaryGrid';

import React from 'react';
import styled from 'styled-components';

const DiaryGridContainer = () => {
  return (
    <Container>
      <DiaryGrid />
      <DiaryGrid />
      <DiaryGrid />
    </Container>
  );
};
const Container = styled.div`
  padding-bottom: 60px;
`;

export default DiaryGridContainer;
