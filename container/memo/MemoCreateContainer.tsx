import Title from '@components/base/Title';
import MemoCreateToolBar from '@components/memo/MemoCreateToolBar';

import { Input } from 'antd';
import React from 'react';
import styled from 'styled-components';

const MemoCreateContainer = () => {
  return (
    <Container>
      <Title name="글쓰기" />
      <MemoCreateToolBar />
      <Input
        placeholder="제목을 입력해주세요."
        size="large"
        className="memoCreateToolbarTitle"
      />
      <Input.TextArea
        rows={20}
        size="large"
        placeholder="남기고 싶은 메모를 작성해보세요."
        className="memoCreateToolbarText"
      />
    </Container>
  );
};
const Container = styled.div`
  .memoCreateToolbarTitle {
    padding: 12px 24px;
    margin-bottom: 12px;
    &:hover {
      border-color: ${({ theme }) => theme.colors.subColor};
    }
    @media ${({ theme }) => theme.devices.mobile} {
      padding: 12px 16px;
      margin-bottom: 8px;
    }
  }
  .memoCreateToolbarText {
    padding: 20px 24px;
    &:hover {
      border-color: ${({ theme }) => theme.colors.subColor};
    }
    @media ${({ theme }) => theme.devices.mobile} {
      padding: 12px 16px;
    }
  }
`;

export default MemoCreateContainer;
