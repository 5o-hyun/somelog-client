import useToggle from '@lib/hooks/useToggle';

import { Badge, DatePicker, Drawer, Input } from 'antd';
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
    category?: string;
  };
  onClose: () => void;
  onChange: (key: string, value: string | number) => void;
  onConfirm: () => void;
}

const ScheduleDrawer: React.FC<ScheduleDrawerProps> = ({
  upsertInfo,
  onClose,
  onChange,
  onConfirm,
}) => {
  const [isOpenDate, toggleDate] = useToggle();
  const [isOpenMemo, toggleMemo] = useToggle();
  return (
    <StyledDrawer placement="bottom" closable={false} onClose={onClose} open>
      <Input
        placeholder="할 일을 입력하세요."
        className="title"
        value={upsertInfo?.title}
        onChange={(e) => onChange('title', e.target.value)}
      />
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
              <DatePicker />
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
          <div className="infoCategory">{upsertInfo?.category}</div>
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
`;

export default ScheduleDrawer;
