import { Memos } from '@typess/memo';

import { Empty } from 'antd';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

interface MemoGridProps {
  memos?: Memos;
}

const MemoGrid: React.FC<MemoGridProps> = ({ memos }) => {
  return (
    <>
      <Container>
        {memos?.map((memo) => (
          <Link href={`/memo/${memo.id}`} key={memo.id}>
            <div className="memo">
              <p className="title">{memo.title}</p>
              <div className="detail">{memo.detail}</div>
            </div>
          </Link>
        ))}
      </Container>
      {memos?.length === 0 && (
        <Empty description="데이터가 없습니다. 새로 등록해보세요!" />
      )}
    </>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  @media ${({ theme }) => theme.devices.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }
  .memo {
    aspect-ratio: 1 / 1;
    padding: 12px;
    box-sizing: border-box;
    cursor: pointer;
    border-radius: 8px;
    background: url('/images/memo/linedpaper.png');
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    @media ${({ theme }) => theme.devices.mobile} {
      aspect-ratio: 1 / 1.4;
    }
    &:hover,
    &:active,
    &:focus {
      background-color: rgba(255, 255, 255, 0.3);
      border: 1px solid ${({ theme }) => theme.colors.primaryColor};
    }
    .title {
      font-size: 18px;
      width: 100%;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      margin-bottom: 8px;
    }
    .detail {
      width: 100%;
      line-height: 1.2;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;
      border-top: 1px solid ${({ theme }) => theme.colors.gray[400]};
      padding-top: 8px;
    }
  }
`;

export default MemoGrid;
