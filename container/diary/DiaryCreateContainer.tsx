import Title from '@components/base/Title';
import DiaryCreateToolbar from '@components/diary/DiaryCreateToolbar';

import { Card, DatePicker, DatePickerProps, Input } from 'antd';
import React from 'react';
import styled from 'styled-components';

const DiaryCreateContainer = () => {
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <Container>
      <Title name="글쓰기" />
      <DiaryCreateToolbar />
      <Card>
        <div className="top">
          <div className="left">
            <p className="dateCalculate">100일</p>
            <DatePicker onChange={onChange} />
          </div>
          <div className="right">
            <Input placeholder="폴라로이드 제목" />
          </div>
        </div>
        <div className="photoWrapper">photoWrapper</div>
      </Card>
    </Container>
  );
};
const Container = styled.div`
  .top {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 20px;
    .left {
      .dateCalculate {
        font-size: 20px;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.textColor};
      }
    }
  }
  .photoWrapper {
  }
`;

export default DiaryCreateContainer;
