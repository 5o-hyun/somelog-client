import { BiCalendarHeart } from 'react-icons/bi';
import {
  BsBox2Heart,
  BsChatHeart,
  BsHouseHeart,
  BsPostcardHeart,
} from 'react-icons/bs';

/* 홈, 캘린더, 채팅, 일기&사진 , 버킷리스트&메모장... */
export const navigationMenu = [
  { id: 1, name: 'home', icon: <BsHouseHeart />, link: '/' },
  { id: 2, name: 'schedule', icon: <BiCalendarHeart />, link: '/schedule' },
  // { id: 3, name: 'chat', icon: <BsChatHeart />, link: '/chat' },
  { id: 4, name: 'diary', icon: <BsPostcardHeart />, link: '/diary' },
  { id: 5, name: 'memo', icon: <BsBox2Heart />, link: '/memo' },
];
