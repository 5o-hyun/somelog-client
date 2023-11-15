import { defaultAxios } from './defaultAxios';

// 일정 전체목록 조회
export const getMemos = async () => {
  const { data } = await defaultAxios.get(`/memos`);
  return data;
};

// 일정 조회
export const getMemo = async (id: number) => {
  const { data } = await defaultAxios.get(`/memo/${id}`);
  return data;
};
