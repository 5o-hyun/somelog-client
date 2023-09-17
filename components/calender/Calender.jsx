import React from 'react';
import styled from 'styled-components';
import { Calendar } from 'antd';

const Calender = ({ onPanelChange, handleDateSelect }) => {
  return (
    <>
      <Container>
        <Calendar onPanelChange={onPanelChange} onSelect={handleDateSelect} />
      </Container>
    </>
  );
};

const Container = styled.div``;

export default Calender;
