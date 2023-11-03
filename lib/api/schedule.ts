import { defaultAxios } from './defaultAxios';

// 일정 전체목록 조회
export const getScheduleList = async () => {
  const { data } = await defaultAxios.get(`/schedules`);
  return data;
};

// 일정 조회
export const getSchedule = async (id: number) => {
  const { data } = await defaultAxios.get(`/schedule/${id}`);
  return data;
};

// 일정 등록
export const createSchedule = async (data: {
  title: string;
  memo: string;
  startDate: string;
  endDate: string;
  category: string;
}) => {
  await defaultAxios.post(`/schedule`, data);
};

// 일정 삭제
export const deleteSchedule = async (id: number) => {
  await defaultAxios.delete(`/schedule/${id}`);
};
