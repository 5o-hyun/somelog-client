import Calender from '@components/calender/Calender';
import CalenderModal from '@components/calender/CalenderModal';
import React, { useState } from 'react';
import styled from 'styled-components';

const CalenderHomeContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  const handleDateSelect = (date) => {
    console.log('선택한 날짜:', date.format('YYYY-MM-DD'));
    showModal();
  };
  return (
    <Container>
      <Calender
        onPanelChange={onPanelChange}
        handleDateSelect={handleDateSelect}
      />
    </Container>
  );
};

const Container = styled.div``;

export default CalenderHomeContainer;
