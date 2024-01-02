import { defaultAxios } from './defaultAxios';

// 유저 연결정보 조회
export const getConnect = async (userId: number) => {
  const { data } = await defaultAxios.get(`/connect/${userId}`);
  return data;
};

// 연인 이미지리스트 조회
export const getImageConnect = async (connectId: number) => {
  const { data } = await defaultAxios.get(`/connect/image/${connectId}`);
  return data;
};

// 연인 이미지리스트 추가
export const createImageConnect = async (data: {
  connectId?: number;
  images: Array<any>;
}) => {
  const { data: result } = await defaultAxios.post(
    `/connect/image/${data.connectId}`,
    {
      images: data.images,
    },
  );
  return result;
};

// 연결정보 수정
export const updateConnect = async (data: {
  id?: number;
  status: string;
  startDate?: string;
  postitStatus: string;
  sliderStatus: string;
  feelStatus: string;
  memoStatus: string;
  DdayStatus: string;
}) => {
  const { data: result } = await defaultAxios.put(`/connect/${data.id}`, {
    status: data.status,
    startDate: data.startDate,
    postitStatus: data.postitStatus,
    sliderStatus: data.sliderStatus,
    feelStatus: data.feelStatus,
    memoStatus: data.memoStatus,
    DdayStatus: data.DdayStatus,
  });
  return result;
};
