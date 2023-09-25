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
import Category from '@components/schedule/Category';
import { getCategoryList } from '@lib/api/category';
import ScheduleDrawer from '@components/schedule/ScheduleDrawer';
import 'dayjs/locale/ko';
import useToggle from '@lib/hooks/useToggle';

dayjs.locale('ko');

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const ScheduleHomeContainer = () => {
  const [isOpenModal, toggleOpenModal] = useToggle(false);
  const [isOpenCategory, toggleOpenCategory] = useToggle(false);
  const [isOpenSchedule, toggleOpenSchedule] = useToggle(false);
  const [selectDate, setSelectDate] = useState();
  const [selectCategory, setSelectCategory] = useState();
  const [todaySchedules, setTodaySchedules] = useState([]);

  const modalClose = () => {
    toggleOpenModal(false);
  };

  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

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

  const onSelectCategory = (category) => {
    setSelectCategory(category);
    toggleOpenCategory();
    toggleOpenSchedule();
  };

  return (
    <Container>
      <Calender
        cellRender={cellRender}
        onPanelChange={onPanelChange}
        handleDateSelect={handleDateSelect}
      />
      {isOpenModal && (
        <CalenderModal
          selectDate={selectDate}
          todaySchedules={todaySchedules}
          categories={categories}
          toggleOpenCategory={toggleOpenCategory}
          modalClose={modalClose}
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
          selectDate={selectDate}
          selectCategory={selectCategory}
          toggleOpenSchedule={toggleOpenSchedule}
        />
      )}
    </Container>
  );
};

const Container = styled.div``;

export default ScheduleHomeContainer;
