import { defaultAxios } from './defaultAxios';

// 다이어리 전체조회
export const getDiaries = async (userId?: number) => {
  const { data } = await defaultAxios.get(`/diaries/${userId}`);
  return data;
};

// 다이어리 조회
export const getDiary = async (id: number) => {
  const { data } = await defaultAxios.get(`/diary/${id}`);
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

// 댓글 등록
export const createComment = async (data: {
  diaryId: number;
  userId: number;
  comment: string;
}) => {
  await defaultAxios.post(`/diary/${data.diaryId}/comment`, data);
};

// 댓글 수정
export const updateComment = async (data: {
  diaryId: number;
  userId?: number;
  commentId: number;
  comment: string;
}) => {
  await defaultAxios.put(`/diary/${data.diaryId}/comment/${data.commentId}`, {
    userId: data.userId,
    comment: data.comment,
  });
};

// 댓글 삭제
export const deleteComment = async (data: {
  diaryId: number;
  commentId: number;
}) => {
  await defaultAxios.delete(`/diary/${data.diaryId}/comment/${data.commentId}`);
};
