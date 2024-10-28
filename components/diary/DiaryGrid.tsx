import { Card } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

dayjs.locale('ko');

interface DiaryGridProps {
  diary: any;
  startDate?: string; // 커플시작일
  onClickDiary: (id: number) => void;
}

const DiaryGrid: React.FC<DiaryGridProps> = ({
  diary,
  startDate,
  onClickDiary,
}) => {
  // 디데이계산
  const [writeDay, setWriteDay] = useState<string>(); // 작성일
  const [today, setToday] = useState(new Date()); // 오늘
  useEffect(() => {
    if (!diary) {
      return;
    }
    setWriteDay(diary.date);
  }, [diary]);

  const calculate = Math.floor(
    (new Date(startDate).getTime() - new Date(String(writeDay)).getTime()) /
      (1000 * 3600 * 24),
  );

  return (
    <>
      <Container onClick={() => onClickDiary(diary.id)}>
        <Card>
          <div className="top">
            <div className="subjectLine">
              <p className="dateCalculate">
                {dayjs(writeDay).format('YYYY-MM-DD') === startDate
                  ? '첫 만난날'
                  : calculate === 0
                    ? '오늘'
                    : `${Math.abs(calculate)}일`}
              </p>
              <p className="subject">{diary.title}</p>
            </div>
            <div className="dateLine">
              <p className="date">
                {dayjs(diary.date).format('YYYY.MM.DD(ddd)')}
              </p>
              {diary.DiaryComments.map((user: any, index: number) => (
                <div key={index} className="photoIcon">
                  <img
                    src={`${process.env.NEXT_PUBLIC_S3URL}${user.User.photo}`}
                    alt="프로필"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="photoWrapper">
            {diary.DiaryImages.map((image: any, index: number) => (
              <div className="photo" key={index}>
                <img src={image.imagePath} alt="이미지" />
              </div>
            ))}
          </div>
        </Card>
      </Container>
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
        font-size: 16px;
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
