import { getColorList } from '@lib/api/color';
import {
  createSchedule,
  deleteSchedule,
  getSchedule,
  getScheduleList,
  updateSchedule,
} from '@lib/api/schedule';
import useToggle from '@lib/hooks/useToggle';

import { Colors } from '@typess/color';
import { Schedule, Schedules } from '@typess/schedule';

import ColorList from '@components/schedule/ColorList';
import ScheduleList from '@components/schedule/ScheduleList';
import ScheduleUpsert from '@components/schedule/ScheduleUpsert';

import { EventContentArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';

import { message } from 'antd';
import dayjs from 'dayjs';
import { on } from 'events';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import styled from 'styled-components';

const ScheduleContainer = () => {
  const { data: schedules, refetch: refetchSchedules } = useQuery<Schedules>(
    ['schedules'],
    getScheduleList,
  );
  const { data: colors } = useQuery<Colors>('colors', getColorList);

  const [isOpenSchedule, toggleSchedule] = useToggle();
  const [isOpenUpsert, toggleUpsert] = useToggle();
  const [isOpenColorSheet, toggleColorSheet] = useToggle();

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
    color?: string;
  }>({
    id: null,
    title: undefined,
    memo: undefined,
    startDate: undefined,
    endDate: undefined,
    color: undefined,
  });

  const onChangeUpsertInfo = (key: string, value: any) => {
    setUpsertInfo((prevUpsertInfo) => ({
      ...prevUpsertInfo,
      [key]: value,
    }));
  };

  const onClickColorSheet = (value: string) => {
    setUpsertInfo((prevUpsertInfo) => ({
      ...prevUpsertInfo,
      color: value,
    }));
    toggleColorSheet();
  };

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

  const updateScheduleMutation = useMutation(updateSchedule, {
    onSuccess: () => {
      message.success('일정이 수정되었습니다.');
      refetchSchedules();
      toggleUpsert();
      toggleSchedule();
    },
    onError: () => {
      message.error('일정을 수정할수없습니다.');
    },
  });

  const onConfirm = () => {
    if (!upsertInfo.title) {
      message.error('제목을 입력해주세요.');
    }
    if (!upsertInfo.color) {
      message.error('컬러를 선택해주세요.');
    }
    if (!upsertInfo.startDate) {
      message.error('시작 날짜를 입력해주세요.');
    }
    if (!upsertInfo.endDate) {
      message.error('종료 날짜를 입력해주세요.');
    }
    if (upsertInfo.id) {
      updateScheduleMutation.mutate(upsertInfo as any);
      return;
    }
    createScheduleMutation.mutate(upsertInfo as any);
  };

  const [scheduleId, setSchduleId] = useState<number | undefined>(undefined);
  const { data: schedule } = useQuery<Schedule>(['schedule', scheduleId], () =>
    getSchedule(scheduleId as number),
  );

  const onClickSchedule = (id: number) => {
    setSchduleId(id);
    toggleUpsert();
  };

  const onClickAdd = () => {
    setSchduleId(undefined);
    toggleUpsert();
  };

  useEffect(() => {
    if (schedule) {
      setUpsertInfo({
        id: schedule.id,
        title: schedule.title,
        memo: schedule.memo,
        startDate: schedule.startDate,
        endDate: schedule.endDate,
        color: schedule.color,
      });
    }
    if (isOpenUpsert === false) {
      setUpsertInfo({
        id: null,
        title: undefined,
        memo: undefined,
        startDate: dayjs(selectDate).format('YYYY-MM-DD'),
        endDate: dayjs(selectDate).format('YYYY-MM-DD'),
        color: colors?.[0].color,
      });
    }
  }, [schedule, isOpenUpsert]);

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
          const pickCategory = colors?.find((v) => v.color === schedule.color);

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
      {isOpenColorSheet && (
        <ColorList
          colors={colors}
          onClose={toggleColorSheet}
          onClick={onClickColorSheet}
        />
      )}
      {isOpenSchedule && (
        <ScheduleList
          date={selectDate}
          todaySchedules={todaySchedules}
          colors={colors}
          onClose={toggleSchedule}
          onClick={onClickSchedule}
          onClickAdd={onClickAdd}
          onDelete={onDeleteSchedule}
        />
      )}
      {isOpenUpsert && (
        <ScheduleUpsert
          upsertInfo={upsertInfo}
          colors={colors}
          onClickColor={toggleColorSheet}
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
