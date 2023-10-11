import React from 'react';
import styled from 'styled-components';
import { Button, Modal } from 'antd';
import { AiFillDelete } from 'react-icons/ai';

const CalenderModal = ({
  selectDate,
  todaySchedules,
  categories,
  toggleOpenCategory,
  toggleOpenModal,
  onClickSchedule,
  onClickDeleteBtn,
}) => {
  return (
    <StyledModal
      title={selectDate?.format('MM월 DD일 ddd요일')}
      open
      onCancel={toggleOpenModal}
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
              color={pickCategory ? pickCategory.color : '#ddd'}
            >
              <div
                className="scheduleContents"
                onClick={() => onClickSchedule(schedule.id)}
              >
                <p>{schedule.category}</p>
                <p>{schedule.title}</p>
              </div>
              <button
                className="deleteBtn"
                onClick={() => onClickDeleteBtn(schedule.id)}
              >
                <AiFillDelete />
              </button>
            </Schedule>
          );
        })}
      </ul>
      <StyledButton className="addScheduleButton" onClick={toggleOpenCategory}>
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
      border-radius: 8px;
      .scheduleContents {
        width: 86%;
        padding: 8px 12px;
        p:first-child {
          font-size: 12px;
          color: ${({ theme }) => theme.colors.gray[600]};
        }
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
  cursor: pointer;
  position: relative;
  .deleteBtn {
    width: 30px;
    height: 30px;
    border: 1px solid ${({ theme }) => theme.colors.gray[400]};
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 8px;
    color: ${({ theme }) => theme.colors.gray[600]};
    &:active,
    &:hover,
    &:focus {
      background-color: rgba(153, 154, 147, 0.32);
    }
  }
`;

export default CalenderModal;
