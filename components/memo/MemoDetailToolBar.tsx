import Button from '@components/base/Button';

import { DeleteOutlined } from '@ant-design/icons';

import { Popconfirm } from 'antd';
import Link from 'next/link';
import React from 'react';
import { FaPen } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import styled from 'styled-components';

interface MemoDetailToolBarProps {
  onDelete: () => void;
}

const MemoDetailToolBar: React.FC<MemoDetailToolBarProps> = ({ onDelete }) => {
  return (
    <Container>
      <Link href={'/memo'}>
        <Button name="돌아가기" icon={<IoIosArrowBack />} size={16} />
      </Link>
      <div className="right">
        <Button name="수정" icon={<FaPen />} />
        <Popconfirm
          title="삭제하시겠습니까?"
          okText="삭제"
          cancelText="취소"
          onConfirm={onDelete}
        >
          <Button name="삭제" icon={<DeleteOutlined />} size={16} />
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

export default MemoDetailToolBar;
