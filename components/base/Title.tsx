import React from 'react';
import styled from 'styled-components';

interface TitleProps {
  name: string;
}

const Title: React.FC<TitleProps> = ({ name }) => {
  return (
    <Container>
      <p className="title">{name}</p>
    </Container>
  );
};
const Container = styled.div`
  padding: 16px 0;
  display: grid;
  place-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  margin-bottom: 16px;
  .title {
    font-size: 24px;
    font-weight: bold;
  }
`;

export default Title;
