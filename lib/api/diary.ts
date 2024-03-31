import { defaultAxios } from './defaultAxios';

// 다이어리 전체조회
export const getDiaries = async (userId?: number) => {
  const { data } = await defaultAxios.get(`/diaries/${userId}`);
  return data;
};

// 다이어리 생성
export const createDiary = async (data: {
  date: string;
  title: string;
  userId?: number;
  files: any;
}) => {
  await defaultAxios.post(`/diary`, data);
  return data;
};
