import useToggle from '@lib/hooks/useToggle';

import DiaryDetailModal from './DiaryDetailModal';
import { Card } from 'antd';
import React from 'react';
import styled from 'styled-components';

const DiaryGrid = () => {
  const [isOpenDetail, toggleOpenDetail] = useToggle();

  return (
    <>
      <Container onClick={toggleOpenDetail}>
        <Card>
          <div className="top">
            <div className="subjectLine">
              <p className="dateCalculate">100일</p>
              <p className="subject">분위기좋은카페에서★</p>
            </div>
            <div className="dateLine">
              <p className="date">2023.10.27(금)</p>
              <div className="photoIcon">
                <img src="http://via.placeholder.com/640x480" alt="프로필" />
              </div>
              <div className="photoIcon">
                <img src="http://via.placeholder.com/640x480" alt="프로필" />
              </div>
            </div>
          </div>
          <div className="photoWrapper">
            <div className="photo">
              <img src="http://via.placeholder.com/640x480" alt="이미지" />
            </div>
            <div className="photo">
              <img src="http://via.placeholder.com/640x480" alt="이미지" />
            </div>
            <div className="photo">
              <img src="http://via.placeholder.com/640x480" alt="이미지" />
            </div>
          </div>
        </Card>
      </Container>
      {isOpenDetail && <DiaryDetailModal onClose={toggleOpenDetail} />}
    </>
  );
};
const Container = styled.div`
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  @media ${({ theme }) => theme.devices.mobile} {
    margin-bottom: 8px;
    padding-bottom: 8px;
  }
  .top {
    margin-bottom: 8px;
    .subjectLine {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
      .dateCalculate {
        font-size: 20px;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.textColor};
      }
      .subject {
        color: ${({ theme }) => theme.colors.textColor};
      }
    }
    .dateLine {
      display: flex;
      gap: 4px;
      .date {
        color: #aaa;
        font-size: 14px;
      }
      .photoIcon {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        overflow: hidden;
      }
    }
  }
  .photoWrapper {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    @media ${({ theme }) => theme.devices.mobile} {
      gap: 8px;
    }
    .photo {
      max-width: 80px;
      aspect-ratio: 1/1;
      border-radius: 8px;
      overflow: hidden;
      @media ${({ theme }) => theme.devices.mobile} {
        max-width: 50px;
      }
    }
  }
`;

export default DiaryGrid;
