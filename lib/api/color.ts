import { defaultAxios } from './defaultAxios';

export const getColorList = async () => {
  const { data } = await defaultAxios.get(`/color`);
  return data;
};
