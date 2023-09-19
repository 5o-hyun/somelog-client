import Calender from '@components/schedule/Calender';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getScheduleList } from '@lib/api/schedule';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import CalenderModal from '@components/schedule/CalenderModal';

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const ScheduleHomeContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectDate, setSelectDate] = useState();
  const [todaySchedules, setTodaySchedules] = useState([]);

  const modalSave = () => {
    // 수정 저장
    setIsModalOpen(false);
  };

  const modalClose = () => {
    setIsModalOpen(false);
  };

  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  const { data: schedules } = useQuery(['schedules'], getScheduleList);

  const handleDateSelect = (date) => {
    console.log('선택한 날짜:', date.format('YYYY-MM-DD'));
    setSelectDate(date);
    filterScheduleByDate(date);
    setIsModalOpen(true);
  };
  const filterScheduleByDate = (date) => {
    let filterSchedule = [];
    schedules?.map((schedule) => {
      const startDate = dayjs(schedule.startDate);
      const endDate = dayjs(schedule.endDate);
      if (
        date.isSameOrAfter(startDate, 'day') &&
        date.isSameOrBefore(endDate, 'day')
      ) {
        filterSchedule.push(schedule);
      }
    });
    setTodaySchedules(filterSchedule);
  };

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
      {isModalOpen && (
        <CalenderModal
          selectDate={selectDate}
          todaySchedules={todaySchedules}
          modalSave={modalSave}
          modalClose={modalClose}
        />
      )}
    </Container>
  );
};

const Container = styled.div``;

export default ScheduleHomeContainer;
