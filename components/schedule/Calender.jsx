import React from 'react';
import styled from 'styled-components';
import { Calendar } from 'antd';

const Calender = ({ onPanelChange, handleDateSelect, cellRender }) => {
  return (
    <StyledCalendar
      onPanelChange={onPanelChange}
      onSelect={handleDateSelect}
      cellRender={cellRender}
    />
  );
};

const StyledCalendar = styled(Calendar)`
  .ant-picker-cell-inner {
    padding: 0 !important;
    margin: 0 2px 0 0 !important;
  }
`;

export default Calender;
