import { Schedules } from '@typess/schedule';

import { DeleteOutlined } from '@ant-design/icons';

import { Modal } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import styled from 'styled-components';

interface ScheduleProps {
  date: any;
  todaySchedules: Schedules;
  onClose: () => void;
  onClickAdd: () => void;
  onDelete: (id: number) => void;
}

const Schedule: React.FC<ScheduleProps> = ({
  date,
  todaySchedules,
  onClose,
  onClickAdd,
  onDelete,
}) => {
  return (
    <StyledModal
      title={dayjs(date).format('YYYY년 MM월 DD일')}
      open
      onCancel={onClose}
    >
      <div className="scheduleWrapper">
        {todaySchedules.map((v) => (
          <div key={v.id} className="schedule">
            <p className="category">{v.category}</p>
            <p className="title">{v.title}</p>
            <div className="deleteBtn" onClick={() => onDelete(v.id)}>
              <DeleteOutlined />
            </div>
          </div>
        ))}
      </div>
      <button className="addBtn" onClick={onClickAdd}>
        + 추가
      </button>
    </StyledModal>
  );
};
const StyledModal = styled(Modal)`
  .ant-modal-body {
    min-height: 400px !important;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .scheduleWrapper {
      display: flex;
      flex-direction: column;
      gap: 12px;
      .schedule {
        background-color: #ddd;
        padding: 8px 16px;
        box-sizing: border-box;
        border-radius: 8px;
        position: relative;
        cursor: pointer;
        .title {
          font-size: 16px;
        }
        .deleteBtn {
          position: absolute;
          top: 50%;
          right: 20px;
          transform: translateY(-50%);
          border: 1px solid ${({ theme }) => theme.colors.gray[400]};
          border-radius: 8px;
          display: grid;
          place-items: center;
          width: 30px;
          height: 30px;
          &:hover,
          &:active,
          &:focus {
            background-color: ${({ theme }) => theme.colors.gray[300]};
          }
          svg {
            width: 100%;
            height: 100%;
            color: ${({ theme }) => theme.colors.gray[500]};
          }
        }
      }
    }
    .addBtn {
      width: 100%;
      height: 40px;
      background-color: ${({ theme }) => theme.colors.gray[100]};
      border-radius: 8px;
    }
  }
  .ant-modal-footer {
    display: none;
  }
`;

export default Schedule;
