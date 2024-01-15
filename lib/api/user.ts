import { defaultAxios } from './defaultAxios';

// 회원 등록
export const createUser = async (data: {
  nickname: string;
  email: string;
  pw: string;
  code: string;
}) => {
  const response = await defaultAxios.post(`/user`, data);
  return response.data;
};

// 로그인
export const login = async (data: { email: string; pw: string }) => {
  const response = await defaultAxios.post(`/user/login`, data);
  return response.data;
};

// 회원 정보 (로그인유지)
export const userLogin = async () => {
  const response = await defaultAxios.get(`/user`);
  return response.data;
};

// 추가정보등록
export const userAddInfo = async (data: {
  userId: number;
  sex: string;
  birthday: string;
}) => {
  const response = await defaultAxios.put(`/user/${data.userId}/addInfo`, {
    sex: data.sex,
    birthday: data.birthday,
  });
  return response.data;
};

// 연인 연결
export const userConnect = async (data: { userId?: number; code: string }) => {
  const response = await defaultAxios.post(`/user/${data.userId}/code`, {
    code: data.code,
  });
  return response.data;
};

// 회원수정
export const updateUser = async (data: {
  id: number;
  photo: string | null;
  nickname: string;
  birthday: string;
  sex: string;
  moodEmoji: string | null;
  moodColor: string | null;
}) => {
  const response = await defaultAxios.put(`/user/${data.id}`, {
    photo: data.photo,
    nickname: data.nickname,
    birthday: data.birthday,
    sex: data.sex,
    moodEmoji: data.moodEmoji,
    moodColor: data.moodColor,
  });
  return response.data;
};
