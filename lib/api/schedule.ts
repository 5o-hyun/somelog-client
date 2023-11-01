import { defaultAxios } from './defaultAxios';

// 일정 전체목록 조회
export const getScheduleList = async () => {
  const { data } = await defaultAxios.get(`/schedules`);
  return data;
};
