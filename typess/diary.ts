export type Polaroids = {
  id: number;
  date: string;
  title: string;
  imagePath: string;
}[];

export type Diaries = {
  id: number;
  date: string;
  title: string;
  UserId: number;
  DiaryImages: {
    imagePath: string;
  }[];
  DiaryComments: {
    UserId: number;
    User: { photo: string };
  }[];
}[];

export type Diary = {
  id: number;
  date: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  DiaryImages: {
    id: number;
    imagePath: string;
  }[];
  DiaryComments: {
    id: number;
    comment: string;
    updatedAt: string;
    UserId: number;
    User: { photo: string };
  }[];
};
