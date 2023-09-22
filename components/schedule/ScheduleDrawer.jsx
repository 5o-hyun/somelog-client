import { Drawer, Input, DatePicker } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { BiCalendarHeart, BiNote, BiSolidNote } from 'react-icons/bi';
import { BsArrowUpShort } from 'react-icons/bs';
import { HiPaperAirplane } from 'react-icons/hi2';
import styled from 'styled-components';

const ScheduleDrawer = ({ selectDate, selectCategory, onToggleSchedule }) => {
  const [isToggleDateBtn, setIsToggleDateBtn] = useState(false);
  const [isOpenMemo, setIsOpenMemo] = useState(false);
  const [info, setInfo] = useState({
    title: '',
    memo: '',
    startDate: selectDate,
    endDate: selectDate,
    category: '',
  });

  const onChangeDatePicker = (date, dateString) => {
    // console.log(date, dateString);
    setInfo({ ...info, startDate: date, endDate: date });
    setIsToggleDateBtn(false);
  };
  console.log(info);

  const onChangeMemo = (e) => {
    setInfo({ ...info, memo: e.target.value });
  };
  const onToggleDateBtn = () => {
    setIsToggleDateBtn((prev) => !prev);
  };
  const onToggleMemoBtn = () => {
    setIsOpenMemo((prev) => !prev);
  };

  return (
    <StyledDrawer
      placement="bottom"
      closable={false}
      onClose={onToggleSchedule}
      open
    >
      <Input placeholder="할 일을 입력하세요." className="title" />
      {isOpenMemo && (
        <div className="memoBox">
          <TextArea rows={4} onChange={onChangeMemo} />
        </div>
      )}
      <div className="wrapper">
        <div className="infoWrapper">
          {isToggleDateBtn ? (
            <div className="infoDate">
              <div className="icon" onClick={onToggleDateBtn}>
                <BiCalendarHeart />
                <BsArrowUpShort />
              </div>
              <DatePicker onChange={onChangeDatePicker} />
            </div>
          ) : (
            <div className="infoDate" onClick={onToggleDateBtn}>
              <BiCalendarHeart />
              <span>
                {info.startDate !== selectDate
                  ? dayjs(info.startDate).format('MM월 DD일 (ddd)')
                  : selectDate?.format('MM월 DD일 (ddd)')}
              </span>
            </div>
          )}
          <div className="infoMemo" onClick={onToggleMemoBtn}>
            {isOpenMemo ? <BiSolidNote /> : <BiNote />}
          </div>
          <div className="infoCategory">{selectCategory.category}</div>
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
