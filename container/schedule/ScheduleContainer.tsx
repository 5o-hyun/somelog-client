import { getCategoryList } from '@lib/api/category';
import {
  createSchedule,
  deleteSchedule,
  getScheduleList,
} from '@lib/api/schedule';
import useToggle from '@lib/hooks/useToggle';

import { Categories } from '@typess/category';
import { Schedules } from '@typess/schedule';

import Category from '@components/schedule/Category';
import Schedule from '@components/schedule/Schedule';
import ScheduleUpsert from '@components/schedule/ScheduleUpsert';

import { EventContentArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';

import { message } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useEffect } from 'react';
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
  const [isOpenUpsert, toggleUpsert] = useToggle();

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
    onChangeUpsertInfo('startDate', dayjs(info.date));
    onChangeUpsertInfo('endDate', dayjs(info.date));
    toggleSchedule();
  };
  const onClickDataCell = (info: any) => {
    filterScheduleByDate(dayjs(info.event.start));
    onChangeUpsertInfo('startDate', dayjs(info.date));
    onChangeUpsertInfo('endDate', dayjs(info.date));
    toggleSchedule();
  };

  const renderEventContent = (eventInfo: EventContentArg) => {
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
      message.error('존재하지 않는 일정입니다.');
    },
  });
  const onDeleteSchedule = (id: number) => {
    deleteScheduleMutation.mutate(id);
  };

  // 스케줄 등록
  const [upsertInfo, setUpsertInfo] = useState<{
    id: number | null;
    title?: string;
    memo?: string;
    startDate?: string;
    endDate?: string;
    category?: string;
  }>({
    id: null,
    title: undefined,
    memo: undefined,
    startDate: undefined,
    endDate: undefined,
    category: undefined,
  });

  const onChangeUpsertInfo = (key: string, value: any) => {
    setUpsertInfo((prevUpsertInfo) => ({
      ...prevUpsertInfo,
      [key]: value,
    }));
  };

  const onClickCategory = (value: string) => {
    onChangeUpsertInfo('category', value);
    toggleCategory();
    toggleUpsert();
  };
  console.log(upsertInfo);

  const createScheduleMutation = useMutation(createSchedule, {
    onSuccess: () => {
      message.success('일정이 등록되었습니다.');
      refetchSchedules();
      toggleUpsert();
      toggleSchedule();
    },
    onError: () => {
      message.error('일정을 등록할수없습니다.');
    },
  });

  const onConfirm = () => {
    if (!upsertInfo.title) {
      message.error('제목을 입력해주세요.');
    }
    if (!upsertInfo.category) {
      message.error('카테고리를 입력해주세요.');
    }
    if (!upsertInfo.startDate) {
      message.error('시작 날짜를 입력해주세요.');
    }
    if (!upsertInfo.endDate) {
      message.error('종료 날짜를 입력해주세요.');
    }
    createScheduleMutation.mutate(upsertInfo as any);
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
        <Category
          categories={categories}
          onClick={onClickCategory}
          onClose={toggleCategory}
        />
      )}
      {isOpenUpsert && (
        <ScheduleUpsert
          upsertInfo={upsertInfo}
          onClose={toggleUpsert}
          onChange={onChangeUpsertInfo}
          onConfirm={onConfirm}
        />
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
