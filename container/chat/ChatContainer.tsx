import socket from '@lib/socket';

import InputField from '@components/chat/InputField';

import React, { useEffect, useState } from 'react';

const ChatContainer = () => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  console.log('messagelist', messageList);

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

  return (
    <>
      <InputField
        message={message}
        onSubmit={sendMessage}
        onChange={onChangeInput}
      />
    </>
  );
};

export default ChatContainer;
