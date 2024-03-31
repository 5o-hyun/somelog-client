export type Diaries = {
  id: number;
  date: string;
  title: string;
  UserId: number;
  DiaryImages: {
    imagePath: string;
  }[];
}[];
