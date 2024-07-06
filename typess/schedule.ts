export type Schedules = {
  id: number;
  title: string;
  memo: string;
  startDate: string;
  endDate: string;
  color: string;
  UserId: number;
  sticker: number | undefined;
}[];

export type Schedule = {
  id: number;
  title: string;
  memo: string;
  startDate: string;
  endDate: string;
  color: string;
  UserId: number;
  sticker: number | undefined;
};
