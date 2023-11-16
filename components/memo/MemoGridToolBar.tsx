import Button from '@components/base/Button';

import Link from 'next/link';
import React from 'react';
import { FaPen } from 'react-icons/fa';
import styled from 'styled-components';

interface MemoGridToolBarProps {}

const MemoGridToolBar: React.FC<MemoGridToolBarProps> = ({}) => {
  return (
    <Container>
      <Link href="/memo/create">
        <Button name="글쓰기" icon={<FaPen />} />
      </Link>
    </Container>
  );
};
const Container = styled.div`
  margin-bottom: 16px;
  display: flex;
  gap: 8px;
`;

export default MemoGridToolBar;
