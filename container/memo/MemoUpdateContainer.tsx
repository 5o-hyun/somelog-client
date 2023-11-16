import Button from '@components/base/Button';
import Title from '@components/base/Title';

import { Input, Popconfirm } from 'antd';
import Link from 'next/link';
import React from 'react';
import { FaPen } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import styled from 'styled-components';

const MemoUpdateContainer = () => {
  return (
    <Container>
      <Title name="수정하기" />
      <div className="toolBar">
        <Link href={`#`}>
          <Button name="돌아가기" icon={<IoIosArrowBack />} size={16} />
        </Link>
        <div className="right">
          <Popconfirm title="수정하시겠습니까?" okText="수정" cancelText="취소">
            <Button name="수정" icon={<FaPen />} size={16} />
          </Popconfirm>
        </div>
      </div>
      <Input
        placeholder="제목을 입력해주세요."
        size="large"
        className="memoUpdateToolbarTitle"
      />
      <Input.TextArea
        placeholder="남기고 싶은 메모를 작성해보세요."
        rows={20}
        size="large"
        className="memoUpdateToolbarText"
      />
    </Container>
  );
};
const Container = styled.div`
  .toolBar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    .right {
      display: flex;
      gap: 8px;
    }
  }
  .memoUpdateToolbarTitle {
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
  .memoUpdateToolbarText {
    padding: 20px 24px;
    &:hover {
      border-color: ${({ theme }) => theme.colors.subColor};
    }
    @media ${({ theme }) => theme.devices.mobile} {
      padding: 12px 16px;
    }
  }
`;

export default MemoUpdateContainer;
