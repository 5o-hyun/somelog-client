import Button from '@components/base/Button';

import React from 'react';
import { FaPen } from 'react-icons/fa';
import styled from 'styled-components';

const MemoGridToolBar = () => {
  return (
    <Container>
      <Button name="글쓰기" icon={<FaPen />} />
    </Container>
  );
};
const Container = styled.div`
  margin-bottom: 16px;
  display: flex;
  gap: 8px;
`;

export default MemoGridToolBar;
