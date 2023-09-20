import { defaultAxios } from './defaultAxios';

export const getCategoryList = async () => {
  const { data } = await defaultAxios.get(`/category`);
  return data;
};
