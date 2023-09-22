import React from 'react';
import styled from 'styled-components';
import { Button, Modal } from 'antd';
import dayjs from 'dayjs';

const CalenderModal = ({
  selectDate,
  todaySchedules,
  categories,
  onToggleCategory,
  modalClose,
}) => {
  return (
    <StyledModal
      title={selectDate?.format('MM월 DD일 ddd요일')}
      open
      onCancel={modalClose}
    >
      <ul className="scheduleList">
        {todaySchedules.map((schedule) => {
          const pickCategory = categories.find(
            (v) => v.category === schedule.category,
          );
          return (
            <Schedule
              key={schedule.id}
              className="schedule"
              color={pickCategory ? pickCategory.color : 'black'}
            >
              <p className="category">{schedule.category}</p>
              <p>{schedule.title}</p>
            </Schedule>
          );
        })}
      </ul>
      <StyledButton className="addScheduleButton" onClick={onToggleCategory}>
        + 할 일을 추가하세요.
      </StyledButton>
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  .scheduleList {
    height: 350px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
    .schedule {
      padding: 8px 12px;
      border-radius: 8px;
      .category {
        font-size: 12px;
        color: ${({ theme }) => theme.colors.gray[600]};
      }
    }
  }
  .ant-modal-footer,
  .ant-modal-close-x {
    display: none;
  }
`;
const StyledButton = styled(Button)`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.gray[300]};
  color: ${({ theme }) => theme.colors.white};
  &:hover {
    border-color: ${({ theme }) => theme.colors.gray[300]} !important;
    background-color: ${({ theme }) => theme.colors.gray[400]};
    color: ${({ theme }) => theme.colors.white} !important;
  }
`;
const Schedule = styled.li`
  background-color: ${(props) => props.color};
`;

export default CalenderModal;
