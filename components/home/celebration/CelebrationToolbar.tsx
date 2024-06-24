import Button from '@components/base/Button';

import Link from 'next/link';
import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import styled from 'styled-components';

interface CelebrationToolbarProps {}

const CelebrationToolbar: React.FC<CelebrationToolbarProps> = ({}) => {
  return (
    <Container>
      <Link href={'/'}>
        <Button name="돌아가기" icon={<IoIosArrowBack />} size={16} />
      </Link>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export default CelebrationToolbar;
