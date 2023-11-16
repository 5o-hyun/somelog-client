import { Memo } from '@typess/memo';

import React from 'react';
import styled from 'styled-components';

interface MemoDetailProps {
  memo?: Memo;
}

const MemoDetail: React.FC<MemoDetailProps> = ({ memo }) => {
  return (
    <Container>
      <p className="title">{memo?.title}</p>
      <div className="detail">{memo?.detail}</div>
    </Container>
  );
};
const Container = styled.div`
  aspect-ratio: 1 / 1.3;
  padding: 36px;
  box-sizing: border-box;
  border-radius: 8px;
  background: url('/images/memo/linedpaper.png');
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  @media ${({ theme }) => theme.devices.mobile} {
    padding: 24px;
  }
  .title {
    font-size: 22px;
    width: 100%;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    margin-bottom: 20px;
    @media ${({ theme }) => theme.devices.mobile} {
      margin-bottom: 12px;
      font-size: 20px;
    }
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
    padding-top: 20px;
    font-size: 18px;
    white-space: pre-wrap;
    @media ${({ theme }) => theme.devices.mobile} {
      padding-top: 12px;
      font-size: 16px;
    }
  }
`;

export default MemoDetail;
