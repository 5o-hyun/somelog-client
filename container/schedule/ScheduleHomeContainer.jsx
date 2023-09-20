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

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const ScheduleHomeContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectDate, setSelectDate] = useState();
  const [todaySchedules, setTodaySchedules] = useState([]);
  const [isToggleCategory, setToggleCategory] = useState(false);
  const [isOpenSchedule, setIsOpenSchedule] = useState(false);

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
  const { data: categories } = useQuery(['categories'], getCategoryList);

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

  const onToggleCategory = () => {
    setToggleCategory((prev) => !prev);
  };

  const onToggleSchedule = () => {
    isToggleCategory === true && setToggleCategory(false);
    setIsOpenSchedule((prev) => !prev);
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
          categories={categories}
          onToggleCategory={onToggleCategory}
          modalSave={modalSave}
          modalClose={modalClose}
        />
      )}
      {isToggleCategory && (
        <Category
          categories={categories}
          onToggleCategory={onToggleCategory}
          onToggleSchedule={onToggleSchedule}
        />
      )}
      {isOpenSchedule && <ScheduleDrawer onToggleSchedule={onToggleSchedule} />}
    </Container>
  );
};

const Container = styled.div``;

export default ScheduleHomeContainer;
