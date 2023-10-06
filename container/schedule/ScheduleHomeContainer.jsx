import Calender from '@components/schedule/Calender';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import styled from 'styled-components';
import {
  createSchedule,
  deleteSchedule,
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
import { useRouter } from 'next/router';

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

  const { data: schedules, refetch: schedulesRefetch } = useQuery(
    ['schedules'],
    getScheduleList,
  );
  const { data: schedule } = useQuery(['schedule', selectScheduleId], () =>
    getSchedule(selectScheduleId),
  );
  const { data: categories } = useQuery(['categories'], getCategoryList);

  const router = useRouter();

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
    let todoLists = [];
    schedules?.forEach((schedule) => {
      const startDate = dayjs(schedule.startDate);
      const endDate = dayjs(schedule.endDate);
      if (
        current.isSameOrAfter(startDate, 'day') &&
        current.isSameOrBefore(endDate, 'day')
      ) {
        const color = getColorForCategory(schedule.category);
        todoLists.push({
          title: schedule.title,
          category: schedule.category,
          color: color,
        });
      }
    });

    return todoLists.map((todoList, index) => (
      <ColorSchedule key={index} color={todoList.color}>
        {todoList.title}
      </ColorSchedule>
    ));
  };

  const getColorForCategory = (categoryName) => {
    const category = categories?.find((cat) => cat.category === categoryName);
    return category ? category.color : '#ffffff';
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
      schedulesRefetch();
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
      schedulesRefetch();
    },
    onError: (error) => {
      successMessage('error', '일정을 수정할수없습니다.');
      console.error(error);
    },
  });

  const deleteScheduleMutation = useMutation(deleteSchedule, {
    onSuccess: () => {
      successMessage('success', '일정이 삭제되었습니다.');
      toggleOpenModal(false);
      schedulesRefetch();
    },
    onError: (error) => {
      successMessage('error', '존재하지 않는 일정입니다.');
      console.error(error);
    },
  });

  const onClickDeleteBtn = (id) => {
    deleteScheduleMutation.mutate(id);
  };

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
  const onChangeCategory = (value) => {
    console.log(value);
    setInfo({ ...info, category: value });
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
            onClickDeleteBtn={onClickDeleteBtn}
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
            categories={categories}
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
            onChangeCategory={onChangeCategory}
          />
        )}
      </Container>
    </>
  );
};

const Container = styled.div``;
const ColorSchedule = styled.div`
  background-color: ${(props) => props.color};
  padding: 2px 4px 2px;
  width: 100%;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`;

export default ScheduleHomeContainer;
