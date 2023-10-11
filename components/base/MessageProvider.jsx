import React, { createContext, useContext } from 'react';
import { message } from 'antd';

const MessageContext = createContext();

export function MessageProvider({ children }) {
  const showMessage = (type, content) => {
    message[type](content);
  };

  return (
    <MessageContext.Provider value={showMessage}>
      {children}
    </MessageContext.Provider>
  );
}

export function useMessage() {
  return useContext(MessageContext);
}
