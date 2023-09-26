import Calender from '@components/schedule/Calender';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import styled from 'styled-components';
import {
  createSchedule,
  getSchedule,
  getScheduleList,
  updateSchedule,
} from '@lib/api/schedule';
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
import { message } from 'antd';

dayjs.locale('ko');

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const ScheduleHomeContainer = () => {
  const [isOpenModal, toggleOpenModal] = useToggle();
  const [isOpenCategory, toggleOpenCategory] = useToggle();
  const [isOpenSchedule, toggleOpenSchedule] = useToggle();
  const [isOpenDateBtn, toggleOpenDateBtn] = useToggle();
  const [isOpenMemo, toggleOpenMemo] = useToggle();

  const [selectDate, setSelectDate] = useState();
  const [selectScheduleId, setSelectScheduleId] = useState();
  const [todaySchedules, setTodaySchedules] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const { data: schedules } = useQuery(['schedules'], getScheduleList);
  const { data: schedule } = useQuery(['schedule', selectScheduleId], () =>
    getSchedule(selectScheduleId),
  );
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
      successMessage('success', '일정이 등록되었습니다.');
      toggleOpenSchedule(false);
      toggleOpenModal(false);
    },
    onError: (error) => {
      successMessage('error', '일정을 등록할수없습니다.');
      console.error(error);
    },
  });

  const updateScheduleMutation = useMutation(updateSchedule, {
    onSuccess: () => {
      successMessage('success', '일정이 수정되었습니다.');
      toggleOpenSchedule(false);
      toggleOpenModal(false);
      setSelectScheduleId(undefined);
    },
    onError: (error) => {
      successMessage('error', '일정을 수정할수없습니다.');
      console.error(error);
    },
  });

  const onClickSchedule = (id) => {
    setSelectScheduleId(id);
    toggleOpenSchedule();
  };

  useEffect(() => {
    setInfo({
      title: schedule?.title,
      memo: schedule?.memo,
      startDate: schedule?.startDate,
      endDate: schedule?.endDate,
      category: schedule?.category,
    });
  }, [schedule]);

  const successMessage = (type, text) => {
    messageApi.open({
      type: type,
      content: text,
    });
  };

  const onClickConfirm = () => {
    schedule
      ? updateScheduleMutation.mutate({ id: selectScheduleId, info: info })
      : createScheduleMutation.mutate(info);
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
      title: '',
      memo: '',
      startDate: selectDate,
      endDate: selectDate,
      category: pickCategory.category,
    });
    toggleOpenCategory();
    toggleOpenSchedule();
  };

  return (
    <>
      {contextHolder}
      <Container>
        <Calender cellRender={cellRender} handleDateSelect={handleDateSelect} />
        {isOpenModal && (
          <CalenderModal
            selectDate={selectDate}
            todaySchedules={todaySchedules}
            categories={categories}
            toggleOpenCategory={toggleOpenCategory}
            toggleOpenModal={toggleOpenModal}
            onClickSchedule={onClickSchedule}
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
    </>
  );
};

const Container = styled.div``;

export default ScheduleHomeContainer;
