import Calender from '@components/schedule/Calender';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import styled from 'styled-components';
import { createSchedule, getScheduleList } from '@lib/api/schedule';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import CalenderModal from '@components/schedule/CalenderModal';
import Category from '@components/schedule/Category';
import { getCategoryList } from '@lib/api/category';
import ScheduleDrawer from '@components/schedule/ScheduleDrawer';
import useToggle from '@lib/hooks/useToggle';
import 'dayjs/locale/ko';

dayjs.locale('ko');

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const ScheduleHomeContainer = () => {
  const [isOpenModal, toggleOpenModal] = useToggle(false);
  const [isOpenCategory, toggleOpenCategory] = useToggle(false);
  const [isOpenSchedule, toggleOpenSchedule] = useToggle(false);
  const [isOpenDateBtn, toggleOpenDateBtn] = useToggle(false);
  const [isOpenMemo, toggleOpenMemo] = useToggle(false);

  const [selectDate, setSelectDate] = useState();
  const [todaySchedules, setTodaySchedules] = useState([]);

  const { data: schedules } = useQuery(['schedules'], getScheduleList);
  const { data: categories } = useQuery(['categories'], getCategoryList);

  const handleDateSelect = (date) => {
    console.log('선택한 날짜:', date.format('YYYY-MM-DD'));
    setSelectDate(date);
    filterScheduleByDate(date);
    toggleOpenModal(true);
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

  const [info, setInfo] = useState({
    title: '',
    memo: '',
    startDate: undefined,
    endDate: undefined,
    category: undefined,
  });

  const createScheduleMutation = useMutation(createSchedule, {
    onSuccess: () => {
      console.log('성공');
    },
    onError: (error) => {
      console.error(error);
    },
    onSettled: () => {
      console.log('실행중이긴하니');
    },
  });

  const onClickConfirm = () => {
    createScheduleMutation.mutate(info);
  };
  const onChangeDatePicker = (date, dateString) => {
    // console.log(date, dateString);
    setInfo({ ...info, startDate: date, endDate: date });
    toggleOpenDateBtn(false);
  };
  const onChangeTitle = (e) => {
    setInfo({ ...info, title: e.target.value });
  };
  const onChangeMemo = (e) => {
    setInfo({ ...info, memo: e.target.value });
  };

  const onSelectCategory = (pickCategory) => {
    setInfo({
      ...info,
      startDate: selectDate,
      endDate: selectDate,
      category: pickCategory.category,
    });
    toggleOpenCategory();
    toggleOpenSchedule();
  };

  return (
    <Container>
      <Calender cellRender={cellRender} handleDateSelect={handleDateSelect} />
      {isOpenModal && (
        <CalenderModal
          selectDate={selectDate}
          todaySchedules={todaySchedules}
          categories={categories}
          toggleOpenCategory={toggleOpenCategory}
          toggleOpenModal={toggleOpenModal}
        />
      )}
      {isOpenCategory && (
        <Category
          categories={categories}
          toggleOpenCategory={toggleOpenCategory}
          onSelectCategory={onSelectCategory}
        />
      )}
      {isOpenSchedule && (
        <ScheduleDrawer
          info={info}
          selectDate={selectDate}
          isOpenDateBtn={isOpenDateBtn}
          isOpenMemo={isOpenMemo}
          toggleOpenSchedule={toggleOpenSchedule}
          toggleOpenDateBtn={toggleOpenDateBtn}
          toggleOpenMemo={toggleOpenMemo}
          onClickConfirm={onClickConfirm}
          onChangeDatePicker={onChangeDatePicker}
          onChangeTitle={onChangeTitle}
          onChangeMemo={onChangeMemo}
        />
      )}
    </Container>
  );
};

const Container = styled.div``;

export default ScheduleHomeContainer;
