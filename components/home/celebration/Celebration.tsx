import { Schedules } from '@typess/schedule';

import { DeleteOutlined } from '@ant-design/icons';

import { Empty, Popconfirm } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import styled from 'styled-components';

interface CelebrationProps {
  lists: Schedules;
  onDelete: (id: number) => void;
}

const Celebration: React.FC<CelebrationProps> = ({ lists, onDelete }) => {
  const onConfirmDelete = (id: number) => {
    onDelete(id);
  };

  return (
    <Container>
      {lists ? (
        lists.map((list) => (
          <div key={list.id} className="wrapper">
            <div className="info">
              <img
                src={`/images/home/celebration/${list.sticker}.png`}
                alt="스티커 "
                className="celebrationSticker"
              />
              <p className="celebrationTitle">{list.title}</p>
              <p className="celebrationDate">
                {dayjs(list.startDate).format('YYYY.MM.DD')}
              </p>
            </div>
            <Popconfirm
              title="기념일을 해제하시겠습니까?"
              description="기념일을 해제해도 일정은 삭제되지 않습니다"
              onConfirm={() => onConfirmDelete(list.id)}
              okText="해제"
              cancelText="취소"
            >
              <div className="deleteBtn">
                <DeleteOutlined />
              </div>
            </Popconfirm>
          </div>
        ))
      ) : (
        <Empty description="데이터가 없습니다. 새로 등록해보세요!" />
      )}
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  .wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    padding: 4px;
    border-radius: 12px;
    .info {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 4px 8px;
      cursor: pointer;
      .celebrationSticker {
        width: 30px;
      }
      .celebrationTitle {
        color: ${({ theme }) => theme.colors.TextColor};
        font-size: 18px;
      }
      .celebrationDate {
        color: ${({ theme }) => theme.colors.gray[500]};
      }
    }
    .deleteBtn {
      border: 1px solid ${({ theme }) => theme.colors.gray[200]};
      padding: 8px;
      border-radius: 12px;
      cursor: pointer;
      &:hover {
        background-color: #ddd;
      }
    }
  }
`;

export default Celebration;
