import { defaultAxios } from './defaultAxios';

// 회원 등록
export const createUser = async (data: {
  nickname: string;
  email: string;
  pw: string;
}) => {
  await defaultAxios.post(`/user`, data);
};
