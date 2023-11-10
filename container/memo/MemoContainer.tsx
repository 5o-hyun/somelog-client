import Button from '@components/base/Button';
import Title from '@components/base/Title';
import Memo from '@components/memo/Memo';

import Link from 'next/link';
import React from 'react';
import { FaPen } from 'react-icons/fa';
import styled from 'styled-components';

const MemoContainer = () => {
  const memos = [
    { id: 1, title: '제목1', detail: '내용들~~~' },
    { id: 2, title: '제목2', detail: '내용들~~~' },
  ];
  return (
    <Container>
      <Title name="메모장" />
      <div className="toolBar">
        <Button name="글쓰기" icon={<FaPen />} />
      </div>
      <div className="memoContainer">
        {memos.map((memo) => (
          <Link href={`/memo/${memo.id}`} key={memo.id}>
            <Memo memo={memo} />
          </Link>
        ))}
      </div>
    </Container>
  );
};
const Container = styled.div`
  .toolBar {
    margin-bottom: 16px;
    display: flex;
    gap: 8px;
  }
  .memoContainer {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
`;

export default MemoContainer;
