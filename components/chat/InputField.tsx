import { Input } from 'antd';
import React, { ReactEventHandler } from 'react';
import { GoPlusCircle } from 'react-icons/go';
import { HiOutlinePaperAirplane, HiPaperAirplane } from 'react-icons/hi2';
import styled from 'styled-components';

interface InputFieldProps {
  message: any;
  onSubmit: (e: any) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  onSubmit,
  message,
  onChange,
}) => {
  return (
    <Container>
      <div className="plusButton">
        <GoPlusCircle />
      </div>
      <form onSubmit={onSubmit} className="inputWrapper">
        <Input.TextArea
          placeholder="내용을 입력하세요."
          value={message}
          onChange={(e: any) => onChange(e)}
        />

        <button type="submit" className="sendButton">
          {message === '' && true ? (
            <HiOutlinePaperAirplane />
          ) : (
            <HiPaperAirplane />
          )}
        </button>
      </form>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  position: absolute;
  left: 0;
  bottom: 50px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px 10px 0 0;
  border: 1px solid ${({ theme }) => theme.colors.gray[100]};
  border-bottom: none;
  padding-top: 8px;
  .plusButton {
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    svg {
      color: ${({ theme }) => theme.colors.primaryColor};
      width: 70%;
      height: 70%;
    }
  }
  .inputWrapper {
    display: flex;
    width: 100%;
    textarea {
      flex: 1;
      font-size: 16px;
    }
    .sendButton {
      width: 42px;
      color: ${({ theme }) => theme.colors.primaryColor};
      svg {
        width: 68%;
        height: 68%;
      }
    }
  }
`;

export default InputField;
