import Button from '@components/base/Button';

import Link from 'next/link';
import React from 'react';
import { FaPen } from 'react-icons/fa';
import styled from 'styled-components';

interface MemoGridToolBarProps {
  onClick: () => void;
}

const MemoGridToolBar: React.FC<MemoGridToolBarProps> = ({ onClick }) => {
  return (
    <Container>
      <Link href="/memo/create">
        <Button name="글쓰기" onClick={onClick} icon={<FaPen />} />
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
