import { Categories } from '@typess/category';
import { Schedules } from '@typess/schedule';

import { DeleteOutlined } from '@ant-design/icons';

import { Modal } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import styled from 'styled-components';

interface ScheduleProps {
  date?: Date;
  todaySchedules: Schedules;
  categories?: Categories;
  onClose: () => void;
  onClickAdd: () => void;
  onDelete: (id: number) => void;
}

const Schedule: React.FC<ScheduleProps> = ({
  date,
  todaySchedules,
  categories,
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
        {todaySchedules.map((schedule) => {
          const pickCategory = categories?.find(
            (v) => v.category === schedule.category,
          );
          return (
            <ScheduleBox
              key={schedule.id}
              color={pickCategory ? pickCategory.color : '#ddd'}
            >
              <p className="category">{schedule.category}</p>
              <p className="title">{schedule.title}</p>
              <div className="deleteBtn" onClick={() => onDelete(schedule.id)}>
                <DeleteOutlined />
              </div>
            </ScheduleBox>
          );
        })}
      </div>
      <button className="addBtn" onClick={onClickAdd}>
        + 할 일을 추가하세요.
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
    }
    .addBtn {
      width: 100%;
      height: 50px;
      background-color: ${({ theme }) => theme.colors.gray[100]};
      border-radius: 8px;
    }
  }
  .ant-modal-footer {
    display: none;
  }
`;
const ScheduleBox = styled.div`
  background-color: ${(props) => props.color};
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
    border: 1px solid ${({ theme }) => theme.colors.gray[500]};
    border-radius: 8px;
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    &:hover,
    &:active,
    &:focus {
      background-color: rgba(190, 190, 190, 0.4);
    }
    svg {
      width: 100%;
      height: 100%;
      color: ${({ theme }) => theme.colors.gray[600]};
    }
  }
`;

export default Schedule;
