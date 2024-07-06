import { defaultAxios } from './defaultAxios';

// 일정 전체목록 조회
export const getStickerList = async () => {
  const { data } = await defaultAxios.get(`/sticker/list`);
  return data;
};
