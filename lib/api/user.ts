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
