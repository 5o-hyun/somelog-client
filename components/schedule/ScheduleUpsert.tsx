import useToggle from '@lib/hooks/useToggle';

import { Colors } from '@typess/color';

import {
  Badge,
  Checkbox,
  CheckboxProps,
  DatePicker,
  Drawer,
  Input,
} from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { BiCalendarHeart, BiNote, BiSolidNote } from 'react-icons/bi';
import { BsArrowUpShort } from 'react-icons/bs';
import { HiPaperAirplane } from 'react-icons/hi2';
import styled from 'styled-components';

interface ScheduleDrawerProps {
  upsertInfo: {
    id: number | null;
    title?: string;
    memo?: string;
    startDate?: string;
    endDate?: string;
    color?: string;
    sticker?: number;
  };
  colors?: Colors;
  isCheck: any;
  onClickColor: () => void;
  onClickSticker: () => void;
  onClose: () => void;
  onChange: (key: string, value: string | number) => void;
  onConfirm: () => void;
  onCheck: (e: any) => void;
}

const ScheduleDrawer: React.FC<ScheduleDrawerProps> = ({
  upsertInfo,
  colors,
  isCheck,
  onClickColor,
  onClickSticker,
  onClose,
  onChange,
  onConfirm,
  onCheck,
}) => {
  const [isOpenDate, toggleDate] = useToggle();
  const [isOpenMemo, toggleMemo] = useToggle();

  return (
    <StyledDrawer placement="bottom" closable={false} onClose={onClose} open>
      <div className="top">
        <Input
          placeholder="할 일을 입력하세요."
          className="title"
          value={upsertInfo?.title}
          onChange={(e) => onChange('title', e.target.value)}
        />
        <div className="celebrationWrapper">
          <Checkbox checked={isCheck} onChange={onCheck} className="checkBox" />
          <p className="checktxt">기념일</p>
          <div
            className={isCheck ? `stickerCheck` : `stickerCheck blind`}
            onClick={onClickSticker}
          >
            <img
              src={
                upsertInfo.sticker
                  ? `/images/home/celebration/${upsertInfo.sticker}.png`
                  : `/images/home/celebration/1.png`
              }
              alt="기념일스티커"
            />
          </div>
        </div>
      </div>
      {isOpenMemo && (
        <div className="memoBox">
          <Input.TextArea
            rows={4}
            value={upsertInfo?.memo}
            onChange={(e) => onChange('memo', e.target.value)}
          />
        </div>
      )}
      <div className="wrapper">
        <div className="infoWrapper">
          {isOpenDate ? (
            <div className="infoDate">
              <div className="icon" onClick={toggleDate}>
                <BiCalendarHeart />
                <BsArrowUpShort />
              </div>
              <DatePicker
                onChange={(date) => {
                  onChange('startDate', dayjs(date).format());
                  onChange('endDate', dayjs(date).format());
                }}
              />
            </div>
          ) : (
            <div className="infoDate" onClick={toggleDate}>
              <BiCalendarHeart />
              <span>
                {dayjs(upsertInfo?.startDate).format('YYYY년 MM월 DD일')}
              </span>
            </div>
          )}
          <div className="infoMemo" onClick={toggleMemo}>
            {isOpenMemo ? <BiSolidNote /> : <BiNote />}
          </div>
          <div className="infoColor">
            {colors?.map(
              (v) =>
                v.color === upsertInfo.color && (
                  <div key={v.id} onClick={onClickColor}>
                    <StyledBadge color={v.color} text={v.name} />
                  </div>
                ),
            )}
          </div>
        </div>
        <div className="confirmButton" onClick={onConfirm}>
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
  .top {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    margin-bottom: 16px;
    .title {
      border: none;
      border-bottom: 1px solid ${({ theme }) => theme.colors.gray[600]};
      border-radius: 0;
      font-size: 16px;
      @media ${({ theme }) => theme.devices.mobile} {
        font-size: 14px;
      }
    }
    .celebrationWrapper {
      display: flex;
      align-items: center;
      gap: 4px;
      .checktxt {
        white-space: nowrap;
      }
      .stickerCheck {
        border: 1px solid ${({ theme }) => theme.colors.primaryColor};
        border-radius: 8px;
        width: 30px;
        height: 30px;
        padding: 2px;
        cursor: pointer;
        transition: 1s;
        &:hover {
          background-color: #eee;
        }
        &.blind {
          display: none;
        }
      }
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
      .infoColor {
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
const StyledBadge = styled(Badge)`
  margin-right: 8px;
  cursor: pointer;
  .ant-badge-status-dot {
    width: 16px !important;
    height: 16px !important;
    @media ${({ theme }) => theme.devices.mobile} {
      width: 14px !important;
      height: 14px !important;
    }
  }
  .ant-badge-status-text {
    margin-inline-start: 4px !important;
  }
`;

export default ScheduleDrawer;
