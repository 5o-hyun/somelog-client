import { defaultAxios } from './defaultAxios';

// 메모 전체목록 조회
export const getMemos = async (userId: number) => {
  const { data } = await defaultAxios.get(`/memos/${userId}`);
  return data;
};

// 메모 조회
export const getMemo = async (id: number) => {
  const { data } = await defaultAxios.get(`/memo/${id}`);
  return data;
};

// 메모 등록
export const createMemo = async (data: {
  title: string;
  detail: string;
  UserId: number;
}) => {
  await defaultAxios.post(`/memo`, data);
};

// 메모 수정
export const updateMemo = async (data: {
  id: number;
  title: string;
  detail: string;
}) => {
  await defaultAxios.put(`/memo/${data.id}`, data);
};

// 메모 삭제
export const deleteMemo = async (id: number) => {
  await defaultAxios.delete(`/memo/${id}`);
};
