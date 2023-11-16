import Button from '@components/base/Button';

import { Popconfirm } from 'antd';
import Link from 'next/link';
import React from 'react';
import { IoIosArrowBack, IoMdSave } from 'react-icons/io';
import styled from 'styled-components';

interface MemoCreateToolBarProps {
  onSave: () => void;
}

const MemoCreateToolBar: React.FC<MemoCreateToolBarProps> = ({ onSave }) => {
  return (
    <Container>
      <Link href={'/memo'}>
        <Button name="돌아가기" icon={<IoIosArrowBack />} size={16} />
      </Link>
      <div className="right">
        <Popconfirm
          title="등록하시겠습니까?"
          okText="등록"
          cancelText="취소"
          onConfirm={onSave}
        >
          <Button name="저장" icon={<IoMdSave />} size={16} />
        </Popconfirm>
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
