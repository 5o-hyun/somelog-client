import { Schedules } from '@typess/schedule';

import { Modal } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import styled from 'styled-components';

interface ScheduleProps {
  date: any;
  todaySchedules: Schedules;
  onClose: () => void;
}

const Schedule: React.FC<ScheduleProps> = ({
  date,
  todaySchedules,
  onClose,
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
          </div>
        ))}
      </div>
      <button className="addBtn">+ 추가</button>
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
        cursor: pointer;
        .title {
          font-size: 16px;
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
