import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  icon?: React.ReactNode;
  name?: string | number;
  size?: number;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ icon, name, size, onClick }) => {
  return (
    <Container size={size} onClick={onClick}>
      {icon}
      <p>{name}</p>
    </Container>
  );
};
const Container = styled.button<{ size?: number }>`
  background-color: ${({ theme }) => theme.colors.primaryColor};
  height: 36px;
  padding: 0 10px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  display: flex;
  align-items: center;
  transition: 0.3s;
  &:active,
  &:focus,
  &:hover {
    background-color: ${({ theme }) => theme.colors.subColor};
  }
  svg {
    width: ${(props) => (props.size ? props.size : 14)}px;
    height: ${(props) => (props.size ? props.size : 14)}px;
    margin-right: 4px;
  }
`;

export default Button;
