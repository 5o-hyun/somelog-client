import { defaultAxios } from './defaultAxios';

// 일정 전체목록 조회
export const getConnect = async (userId: number) => {
  const { data } = await defaultAxios.get(`/connect/${userId}`);
  return data;
};
