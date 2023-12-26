import { Checkbox, DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import styled from 'styled-components';

interface DecoDisplayProps {
  widget: {
    id?: number;
    status?: string;
    startDate?: string;
    postitStatus?: string;
    sliderStatus?: string;
    feelStatus?: string;
    memoStatus?: string;
    DdayStatus: string;
  };
  isChecked: (e: any, key: string) => void;
  onChange: (date: Dayjs | null) => void;
}

const DecoDisplay: React.FC<DecoDisplayProps> = ({
  widget,
  isChecked,
  onChange,
}) => {
  const widgetList = [
    {
      id: 1,
      label: '배경 이미지 슬라이더',
      value: 'sliderStatus',
      checked: widget.sliderStatus === 'Y' ? true : false,
    },
    {
      id: 2,
      label: '사귄 날짜 계산기',
      value: 'postitStatus',
      checked: widget.postitStatus === 'Y' ? true : false,
    },
    {
      id: 3,
      label: '다가오는 기념일',
      value: 'DdayStatus',
      checked: widget.DdayStatus === 'Y' ? true : false,
    },
    {
      id: 4,
      label: '우리의 프로필/기분',
      value: 'feelStatus',
      checked: widget.feelStatus === 'Y' ? true : false,
    },
    {
      id: 5,
      label: '메모함',
      value: 'memoStatus',
      checked: widget.memoStatus === 'Y' ? true : false,
    },
  ];

  return (
    <Container>
      <p className="decoDisplayTitle">
        커플 모두에게 적용되는 홈 꾸미기입니다.
      </p>
      <p className="decoDisplayDesc">
        간단한 터치로 원하는 구성을 만들어 자유롭게 우리만의 커플홈을
        꾸며보세요.
      </p>
      <div className="decoSelectWrapper">
        {widgetList.map((v) =>
          v.value === 'postitStatus' ? (
            <div key={v.id}>
              <Checkbox
                onChange={(e: any) => isChecked(e, v.value)}
                checked={v.checked}
              >
                {v.label}
              </Checkbox>
              <div className="startLoveDay">
                <p>사귄날 정하기</p>
                <DatePicker
                  value={dayjs(widget.startDate)}
                  onChange={(date) => onChange(date)}
                />
              </div>
            </div>
          ) : (
            <Checkbox
              key={v.id}
              onChange={(e) => isChecked(e, v.value)}
              checked={v.checked}
            >
              {v.label}
            </Checkbox>
          ),
        )}
      </div>
    </Container>
  );
};
const Container = styled.div`
  .decoDisplayTitle {
    text-align: center;
    font-size: 20px;
    width: fit-content;
    margin: 0 auto 12px;
    padding-top: 12px;
    box-shadow: inset 0px -0.5em 0 0 #f5e7ff;
  }
  .decoDisplayDesc {
    text-align: center;
    color: ${({ theme }) => theme.colors.gray[500]};
    line-height: 1.4;
    margin-bottom: 40px;
  }
  .decoSelectWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    margin-bottom: 40px;
    .startLoveDay {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-left: 28px;
      margin-top: 12px;
    }
    .ant-checkbox-wrapper {
      font-size: 16px;
      min-width: 160px;
      .ant-checkbox-inner {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

export default DecoDisplay;
