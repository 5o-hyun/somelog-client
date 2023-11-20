import { io } from 'socket.io-client';

const socket = io('http://localhost:5001'); // 백엔드주소로 연결하는 소켓을만든다.

export default socket;
