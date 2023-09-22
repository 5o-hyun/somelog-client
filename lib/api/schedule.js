import { defaultAxios } from './defaultAxios';

// 일정 전체목록 조회
export const getScheduleList = async () => {
  const { data } = await defaultAxios.get(`/schedules`);
  return data;
};

// 일정 등록
export const createSchedule = async (data) => {
  await defaultAxios.post('/schedule', {
    title: data.title,
    memo: data.memo,
    startDate: data.startDate,
    endDate: data.endDate,
    category: data.category,
  });
};
