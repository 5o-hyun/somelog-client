import { defaultAxios } from './defaultAxios';

export const getScheduleList = async () => {
  const { data } = await defaultAxios.get(`/schedules`);
  return data;
};
