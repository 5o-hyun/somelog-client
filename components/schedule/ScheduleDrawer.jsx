import { Drawer, Input, DatePicker } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { BiCalendarHeart, BiNote, BiSolidNote } from 'react-icons/bi';
import { BsArrowUpShort } from 'react-icons/bs';
import { HiPaperAirplane } from 'react-icons/hi2';
import styled from 'styled-components';

const { TextArea } = Input;

const ScheduleDrawer = ({
  info,
  selectDate,
  isOpenDateBtn,
  isOpenMemo,
  toggleOpenSchedule,
  toggleOpenDateBtn,
  toggleOpenMemo,
  onClickConfirm,
  onChangeDatePicker,
  onChangeTitle,
  onChangeMemo,
}) => {
  return (
    <StyledDrawer
      placement="bottom"
      closable={false}
      onClose={toggleOpenSchedule}
      open
    >
      <Input
        placeholder="할 일을 입력하세요."
        className="title"
        onChange={onChangeTitle}
      />
      {isOpenMemo && (
        <div className="memoBox">
          <TextArea rows={4} value={info.memo} onChange={onChangeMemo} />
        </div>
      )}
      <div className="wrapper">
        <div className="infoWrapper">
          {isOpenDateBtn ? (
            <div className="infoDate">
              <div className="icon" onClick={toggleOpenDateBtn}>
                <BiCalendarHeart />
                <BsArrowUpShort />
              </div>
              <DatePicker onChange={onChangeDatePicker} />
            </div>
          ) : (
            <div className="infoDate" onClick={toggleOpenDateBtn}>
              <BiCalendarHeart />
              <span>
                {info.startDate === selectDate
                  ? selectDate?.format('MM월 DD일 (ddd)')
                  : dayjs(info.startDate).format('MM월 DD일 (ddd)')}
              </span>
            </div>
          )}
          <div className="infoMemo" onClick={toggleOpenMemo}>
            {isOpenMemo ? <BiSolidNote /> : <BiNote />}
          </div>
          <div className="infoCategory">{info.category}</div>
        </div>
        <div className="confirmButton" onClick={onClickConfirm}>
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
  .memoBox {
    margin-bottom: 16px;
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
        .icon {
          border-radius: 4px;
          &:active {
            background-color: ${({ theme }) => theme.colors.gray[200]};
          }
          svg {
            width: 26px;
            height: 26px;
            @media ${({ theme }) => theme.devices.mobile} {
              width: 22px;
              height: 22px;
            }
          }
        }
        svg {
          width: 26px;
          height: 26px;
          border-radius: 4px;
          &:active {
            background-color: ${({ theme }) => theme.colors.gray[200]};
          }
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
