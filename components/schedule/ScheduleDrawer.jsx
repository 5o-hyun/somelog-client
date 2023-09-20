import { Drawer, Input } from 'antd';
import React from 'react';
import { BiCalendarHeart, BiNote } from 'react-icons/bi';
import { HiPaperAirplane } from 'react-icons/hi2';
import styled from 'styled-components';

const ScheduleDrawer = ({ onToggleSchedule }) => {
  return (
    <StyledDrawer
      placement="bottom"
      closable={false}
      onClose={onToggleSchedule}
      open
    >
      <Input placeholder="할 일을 입력하세요." className="title" />
      <div className="wrapper">
        <div className="infoWrapper">
          <div className="infoDate">
            <BiCalendarHeart />
            <span>9월 9일 (토)</span>
          </div>
          <div className="infoMemo">
            <BiNote />
          </div>
          <div className="infoCategory">약속</div>
        </div>
        <div className="confirmButton">
          <HiPaperAirplane />
        </div>
      </div>
    </StyledDrawer>
  );
};
const StyledDrawer = styled(Drawer)`
  width: 576px !important;
  margin: 0 auto;
  border-radius: 8px 8px 0 0;
  @media ${({ theme }) => theme.devices.mobile} {
    width: 100% !important;
  }
  .title {
    margin-bottom: 16px;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[600]};
    border-radius: 0;
    font-size: 16px;
    @media ${({ theme }) => theme.devices.mobile} {
      font-size: 14px;
    }
  }
  .wrapper {
    display: flex;
    .infoWrapper {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 24px;
      font-size: 16px;
      @media ${({ theme }) => theme.devices.mobile} {
        font-size: 14px;
      }
      .infoDate {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        svg {
          width: 26px;
          height: 26px;
          @media ${({ theme }) => theme.devices.mobile} {
            width: 22px;
            height: 22px;
          }
        }
      }
      .infoMemo {
        display: flex;
        align-items: center;
        cursor: pointer;
        svg {
          width: 24px;
          height: 24px;
          @media ${({ theme }) => theme.devices.mobile} {
            width: 22px;
            height: 22px;
          }
        }
      }
      .infoCategory {
        cursor: pointer;
      }
    }
    .confirmButton {
      display: flex;
      align-items: center;
      cursor: pointer;
      svg {
        width: 22px;
        height: 22px;
        @media ${({ theme }) => theme.devices.mobile} {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
`;

export default ScheduleDrawer;
