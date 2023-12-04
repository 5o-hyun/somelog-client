import { defaultAxios } from './defaultAxios';

// 회원 등록
export const createUser = async (data: {
  nickname: string;
  email: string;
  pw: string;
}) => {
  const response = await defaultAxios.post(`/user`, data);
  return response.data;
};

// 로그인
export const login = async (data: { email: string; pw: string }) => {
  const response = await defaultAxios.post(`/user/login`, data);
  return response.data;
};

// 로그인유지
export const userLogin = async () => {
  const { data } = await defaultAxios.get(`/user`);
  return;
};
