import { getCategoryList } from '@lib/api/category';
import { deleteSchedule, getScheduleList } from '@lib/api/schedule';
import useToggle from '@lib/hooks/useToggle';

import { Categories } from '@typess/category';
import { Schedules } from '@typess/schedule';

import Category from '@components/schedule/Category';
import Schedule from '@components/schedule/Schedule';

import { EventContentArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';

import { message } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import styled from 'styled-components';

const ScheduleContainer = () => {
  const { data: schedules, refetch: refetchSchedules } = useQuery<Schedules>(
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

  // 캘린더
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
    console.log(eventInfo);
    return (
      <ScheduleBox color={eventInfo.backgroundColor}>
        <p>{eventInfo.event.title}</p>
      </ScheduleBox>
    );
  };

  // 스케줄
  const deleteScheduleMutation = useMutation(deleteSchedule, {
    onSuccess: () => {
      message.success('일정이 삭제되었습니다.');
      refetchSchedules();
      toggleSchedule();
    },
    onError: () => {
      console.log('존재하지 않는 일정입니다.');
    },
  });

  const onDeleteSchedule = (id: number) => {
    deleteScheduleMutation.mutate(id);
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
        eventColor="green"
        events={schedules?.map((schedule) => {
          const pickCategory = categories?.find(
            (v) => v.category === schedule.category,
          );

          return {
            id: schedule.id.toString(),
            title: schedule.title,
            start: schedule.startDate,
            end: schedule.endDate,
            backgroundColor: pickCategory?.color,
          };
        })}
        eventContent={renderEventContent}
        dateClick={onClickEmptyCell}
        eventClick={onClickDataCell}
      />

      {isOpenSchedule && (
        <Schedule
          date={selectDate}
          todaySchedules={todaySchedules}
          categories={categories}
          onClose={toggleSchedule}
          onClickAdd={toggleCategory}
          onDelete={onDeleteSchedule}
        />
      )}
      {isOpenCategory && (
        <Category categories={categories} onClose={toggleCategory} />
      )}
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
  .fc-event {
    background-color: transparent;
  }
`;
const ScheduleBox = styled.div`
  width: 100%;
  padding: 6px 0;
  border-radius: 4px;
  background-color: ${(props) => props.color};
  cursor: pointer;
  &:hover,
  &:active,
  &:focus {
    box-shadow: none;
  }
  p {
    width: 100%;
    padding-left: 2px;
    box-sizing: border-box;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
`;

export default ScheduleContainer;
