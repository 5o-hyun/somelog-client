import { Schedules } from '@/types/schedule';
import Category from '@components/schedule/Category';
import { EventContentArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { getScheduleList } from '@lib/api/schedule';
import useToggle from '@lib/hooks/useToggle';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import interactionPlugin from '@fullcalendar/interaction';
import { getCategoryList } from '@lib/api/category';
import { Categories } from '@/types/category';
import Schedule from '@components/schedule/Schedule';
import dayjs from 'dayjs';

const ScheduleContainer = () => {
  const { data: schedules } = useQuery<Schedules>(
    ['schedules'],
    getScheduleList,
  );
  const { data: categories } = useQuery<Categories>(
    'categories',
    getCategoryList,
  );

  const [isOpenSchedule, toggleSchedule] = useToggle();
  const [isOpenCategory, toggleCategory] = useToggle();

  const [selectDate, setSelectDate] = useState();
  const [todaySchedules, setTodaySchedules] = useState<Schedules>([]);

  const filterScheduleByDate = (date: any) => {
    let filterSchedule: Schedules = [];
    schedules?.map((schedule) => {
      const startDate = dayjs(schedule.startDate);
      const endDate = dayjs(schedule.endDate);
      if (date.isSame(startDate, 'day') || date.isAfter(startDate, 'day')) {
        if (date.isSame(endDate, 'day') || date.isBefore(endDate, 'day')) {
          filterSchedule.push(schedule);
        }
      }
    });
    setTodaySchedules(filterSchedule);
    setSelectDate(date);
  };

  const onClickEmptyCell = (info: any) => {
    filterScheduleByDate(dayjs(info.date));
    toggleSchedule();
  };

  const onClickDataCell = (info: any) => {
    filterScheduleByDate(dayjs(info.event.start));
    toggleSchedule();
  };

  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <>
        <p>{eventInfo.event.title}</p>
      </>
    );
  };

  return (
    <Container>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="ko"
        headerToolbar={{
          left: 'prev',
          center: 'title',
          right: 'next',
        }}
        contentHeight="auto"
        eventOverlap={false}
        slotEventOverlap={false}
        events={schedules?.map((schedule) => ({
          id: schedule.id.toString(),
          title: schedule.title,
          start: schedule.startDate,
          end: schedule.endDate,
        }))}
        eventContent={renderEventContent}
        dateClick={onClickEmptyCell}
        eventClick={onClickDataCell}
      />

      {isOpenSchedule && (
        <Schedule
          date={selectDate}
          todaySchedules={todaySchedules}
          onClose={toggleSchedule}
        />
      )}
      {/* {isOpenCategory && (
        <Category categories={categories} onClose={toggleCategory} />
      )} */}
    </Container>
  );
};

const Container = styled.div`
  .fc-button-primary {
    background-color: ${({ theme }) => theme.colors.primaryColor};
    border: none;
    &:active,
    &:focus,
    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryColor} !important;
      box-shadow: none !important;
    }
  }
`;

export default ScheduleContainer;
