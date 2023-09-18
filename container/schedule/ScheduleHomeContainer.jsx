import Calender from '@components/schedule/Calender';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getScheduleList } from '@lib/api/schedule';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const ScheduleHomeContainer = () => {
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  const handleDateSelect = (date) => {
    console.log('선택한 날짜:', date.format('YYYY-MM-DD'));
    showModal();
  };

  const { data: schedules } = useQuery(['schedules'], getScheduleList);

  const cellRender = (current, info) => {
    let titles = [];
    schedules?.forEach((schedule) => {
      // console.log(current, dayjs(schedule.startDate));
      const startDate = dayjs(schedule.startDate);
      const endDate = dayjs(schedule.endDate);
      if (
        current.isSameOrAfter(startDate, 'day') &&
        current.isSameOrBefore(endDate, 'day')
      ) {
        titles.push(schedule.title);
      }
    });

    return titles.map((title, index) => (
      <div key={index}>
        {title}
        <br />
      </div>
    ));
  };

  return (
    <Container>
      <Calender
        cellRender={cellRender}
        onPanelChange={onPanelChange}
        handleDateSelect={handleDateSelect}
      />
    </Container>
  );
};

const Container = styled.div``;

export default ScheduleHomeContainer;
