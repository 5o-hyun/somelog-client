import { defaultAxios } from './defaultAxios';

export const getCategoryList = async () => {
  const { data } = await defaultAxios.get(`/category`);
  return data;
};

export const createCategory = async ({ categoryInfo }) => {
  const { data } = await defaultAxios.create(`/category`, {
    category: categoryInfo.category,
    color: categoryInfo.color,
  });
  return data;
};

export const updateCategory = async ({ id, categoryInfo }) => {
  const { data } = await defaultAxios.put(`/category/${id}`, {
    category: categoryInfo.category,
    color: categoryInfo.color,
  });
  return data;
};
