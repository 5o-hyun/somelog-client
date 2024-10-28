import { defaultAxios } from './defaultAxios';

// 일정 전체목록 조회
export const getScheduleList = async (userId: number) => {
  const { data } = await defaultAxios.get(`/schedules/${userId}`);
  return data;
};

// 기념일 전체목록 조회
export const getCelebrationList = async (userId: number) => {
  const { data } = await defaultAxios.get(`/schedules/${userId}/celebration`);
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
  color: string;
  UserId: number;
  sticker: number | undefined;
}) => {
  await defaultAxios.post(`/schedule`, data);
};

// 일정 수정
export const updateSchedule = async (data: {
  id: number;
  title: string;
  memo: string;
  startDate: string;
  endDate: string;
  color: string;
  UserId: number;
  sticker: number | undefined;
}) => {
  await defaultAxios.put(`/schedule/${data.id}`, {
    title: data.title,
    memo: data.memo,
    startDate: data.startDate,
    endDate: data.endDate,
    color: data.color,
    UserId: data.UserId,
    sticker: data.sticker,
  });
};

// 일정 삭제
export const deleteSchedule = async (id: number) => {
  await defaultAxios.delete(`/schedule/${id}`);
};

// 기념일 삭제
export const deleteCelebration = async (id: number) => {
  await defaultAxios.put(`/schedule/${id}/celebration`);
};
