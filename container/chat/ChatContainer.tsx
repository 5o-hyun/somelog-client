import socket from '@lib/socket';

import { User } from '@typess/user';

import InputField from '@components/chat/InputField';

import MessageContainer from './MessageContainer';
import React, { useEffect, useState } from 'react';

const ChatContainer = () => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessageList((prev) => prev.concat(message));
    });
  }, []);

  const sendMessage = (e: any) => {
    // form onsubmit시 웹페이지를 새로고침하므로 막아줌
    e.preventDefault();

    // 서버에 메세지보내기
    socket.emit('sendMessage', message, (res: any) => {
      console.log('sendMessage res', res);
    });
    setMessage('');
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  // [로그인]
  const [user, setUser] = useState<User>({
    name: '',
    online: false,
    token: '',
    _id: '',
  });

  const askUserName = () => {
    const userName = prompt('당신의 이름을 입력하세요');

    // .emit(대화의제목,보낼내용,콜백함수(앞에처리가잘되었으면 response받는다))
    socket.emit('login', userName, (res: any) => {
      console.log('res', res);
      if (res?.ok) {
        setUser(res.data);
      }
    });
  };

  useEffect(() => {
    askUserName();
  }, []);

  return (
    <>
      <MessageContainer messageList={messageList} user={user} />
      <InputField
        message={message}
        onSubmit={sendMessage}
        onChange={onChangeInput}
      />
    </>
  );
};

export default ChatContainer;
