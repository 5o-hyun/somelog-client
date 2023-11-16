import Button from '@components/base/Button';

import Link from 'next/link';
import React from 'react';
import { IoIosArrowBack, IoMdSave } from 'react-icons/io';
import styled from 'styled-components';

const MemoCreateToolBar = () => {
  return (
    <Container>
      <Link href={'/memo'}>
        <Button name="돌아가기" icon={<IoIosArrowBack />} size={16} />
      </Link>
      <div className="right">
        <Button name="저장" icon={<IoMdSave />} size={16} />
      </div>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  .right {
    display: flex;
    gap: 8px;
  }
`;

export default MemoCreateToolBar;
