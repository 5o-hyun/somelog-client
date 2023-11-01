import { Schedules } from '@/types/schedule';
import { EventContentArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { getScheduleList } from '@lib/api/schedule';
import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

const ScheduleContainer = () => {
  const { data: schedules } = useQuery<Schedules>(
    ['schedules'],
    getScheduleList,
  );
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
        plugins={[dayGridPlugin]}
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
      />
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
