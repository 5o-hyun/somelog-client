import Button from '@components/base/Button';

import Link from 'next/link';
import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import styled from 'styled-components';

const InquiryToolbar = () => {
  return (
    <Container>
      <Link href={'/'}>
        <Button name="돌아가기" icon={<IoIosArrowBack />} size={16} />
      </Link>
    </Container>
  );
};
const Container = styled.div`
  margin-bottom: 16px;
`;

export default InquiryToolbar;
