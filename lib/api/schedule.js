import { defaultAxios } from './defaultAxios';

// 일정 전체목록 조회
export const getScheduleList = async () => {
  const { data } = await defaultAxios.get(`/schedules`);
  return data;
};

// 일정 조회
export const getSchedule = async (id) => {
  const { data } = await defaultAxios.get(`/schedule/${id}`);
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

// 일정 수정
export const updateSchedule = async ({ id, info }) => {
  const { data } = await defaultAxios.put(`/schedule/${id}`, {
    title: info.title,
    memo: info.memo,
    startDate: info.startDate,
    endDate: info.endDate,
    category: info.category,
  });
  return data;
};

// 일정 삭제
export const deleteSchedule = async (id) => {
  await defaultAxios.delete(`/schedule/${id}`);
};
