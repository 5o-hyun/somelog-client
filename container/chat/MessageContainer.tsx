import { User } from '@typess/user';

import React from 'react';
import styled from 'styled-components';

interface MessageContainerProps {
  messageList: any;
  user: User;
}

const MessageContainer: React.FC<MessageContainerProps> = ({
  messageList,
  user,
}) => {
  return (
    <>
      {messageList.map((message: any, index: number) => {
        return (
          <Container key={message._id} className="message-container">
            {message.user.name === 'system' ? (
              <div className="systemMessageWrapper">
                <p className="message">{message.chat}</p>
              </div>
            ) : message.user.name === user.name ? (
              <div className="myMessageWrapper">
                <div className="message">{message.chat}</div>
              </div>
            ) : (
              <div className="yourMessageWrapper">
                <img
                  src="/images/chat/profile-no.jpg"
                  className="profileImg"
                  style={
                    (index === 0
                      ? { visibility: 'visible' }
                      : messageList[index - 1].user.name === user.name) ||
                    messageList[index - 1].user.name === 'system'
                      ? { visibility: 'visible' }
                      : { visibility: 'hidden' }
                  }
                />
                <div className="message">{message.chat}</div>
              </div>
            )}
          </Container>
        );
      })}
    </>
  );
};
const Container = styled.div`
  .systemMessageWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;
    .message {
      background-color: #55667758;
      border-radius: 100px;
      text-align: center;
      color: ${({ theme }) => theme.colors.white};
      padding: 4px 14px;
      font-size: 14px;
    }
  }
  .myMessageWrapper {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 5px;
    .message {
      background-color: ${({ theme }) => theme.colors.primaryColor};
      border-radius: 8px;
      padding: 8px;
      max-width: 200px;
      font-size: 16px;
    }
  }
  .yourMessageWrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .profileImg {
      width: 38px;
      height: 38px;
      border-radius: 100px;
      margin-right: 10px;
    }
    .message {
      background-color: ${({ theme }) => theme.colors.white};
      border-radius: 8px;
      padding: 8px;
      max-width: 200px;
      font-size: 16px;
    }
  }
`;

export default MessageContainer;
