import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

interface MemoListProps {
  memos: any;
}

const MemoList: React.FC<MemoListProps> = ({ memos }) => {
  return (
    <Container>
      {memos?.length === 0 && (
        <Link href={'/memo'} className="emptyContainer">
          <p>
            아직 메모함에 아무것도 존재하지않습니다.
            <br />
            지금 이곳을 눌러 메모를 등록해보세요
          </p>
        </Link>
      )}
      {memos?.[0] && (
        <Memo>
          <Link href={`/memo/${memos[0].id}`}>
            <p className="memoTitle">{memos[0].title}</p>
            <div className="memoDetail">{memos[0].detail}</div>
          </Link>
        </Memo>
      )}
      {memos?.[1] && (
        <Memo>
          <Link href={`/memo/${memos[1].id}`}>
            <p className="memoTitle">{memos[1].title}</p>
            <div className="memoDetail">{memos[1].detail}</div>
          </Link>
        </Memo>
      )}
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  .emptyContainer {
    width: 100%;
    text-align: center;
    line-height: 1.4;
    font-size: 14px;
    &:hover {
      color: ${({ theme }) => theme.colors.subColor};
    }
  }
`;
const Memo = styled.div`
  width: 50%;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
  cursor: pointer;
  a {
    display: block;
    width: 100%;
    height: 100%;
    padding: 12px 16px;
  }
  .memoTitle {
    margin-bottom: 8px;
  }
  .memoDetail {
    font-size: 14px;
    width: 100%;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    white-space: pre-wrap;
    max-height: 60px;
    overflow: hidden;
  }
  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 24px;
    background: url('/images/home/tape_gray.png');
    background-size: cover !important;
    position: absolute;
    top: -10px;
    right: -8px;
    opacity: 70%;
  }
  &:first-child::after {
    background: url('/images/home/tape_pink.png');
    opacity: 50%;
  }
`;

export default MemoList;
