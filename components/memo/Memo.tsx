import React from 'react';
import styled from 'styled-components';

interface MemoProps {
  memo: {
    id: number;
    title: string;
    detail: string;
  };
}

const Memo: React.FC<MemoProps> = ({ memo }) => {
  return (
    <Container>
      <p className="title">{memo.title}</p>
      <div className="detail">{memo.detail}</div>
    </Container>
  );
};
const Container = styled.div`
  aspect-ratio: 1 / 1;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 12px;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 8px;
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
    margin-bottom: 12px;
  }
  .detail {
    width: 100%;
    line-height: 1.2;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
  }
`;

export default Memo;
