import { getMemo } from '@lib/api/memo';

import { Memo } from '@typess/memo';

import Button from '@components/base/Button';
import Title from '@components/base/Title';
import MemoDetail from '@components/memo/MemoDetail';

import { DeleteOutlined } from '@ant-design/icons';

import { Card } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FaPen } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import { useQuery } from 'react-query';
import styled from 'styled-components';

const MemoIdContainer = () => {
  const router = useRouter();
  const memoId = Number(router.query.id);

  const { data: memo } = useQuery<Memo>(['schedule', memoId], () =>
    getMemo(memoId),
  );

  return (
    <Container>
      <Title name="메모장" />
      <div className="toolBar">
        <Link href={'/memo'}>
          <Button name="돌아가기" icon={<IoIosArrowBack />} size={16} />
        </Link>
        <div className="right">
          <Button name="수정" icon={<FaPen />} />
          <Button name="삭제" icon={<DeleteOutlined />} size={16} />
        </div>
      </div>
      <MemoDetail memo={memo} />
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
`;

export default MemoIdContainer;
