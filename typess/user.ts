// export type User = {
//   name: string;
//   online: boolean;
//   token: string;
//   _id: string;
// };

export type User = {
  id: number;
  nickname: string;
  email: string;
  sex: string;
  birthday: string;
  code: string;
  photo: string | null;
  moodEmoji: string | null;
  moodColor: string | null;
  partner: {
    id: number;
    nickname: string;
    sex: string;
    birthday: string;
    photo: string | null;
    moodEmoji: string | null;
    moodColor: string | null;
  };
};
