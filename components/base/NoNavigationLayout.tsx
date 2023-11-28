import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface NoNavigationLayoutProps {
  children: ReactNode;
}

const NoNavigationLayout: React.FC<NoNavigationLayoutProps> = ({
  children,
}) => {
  return (
    <Container>
      <main>{children}</main>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  width: 576px;
  min-height: 100vh;
  margin: 0 auto;
  position: relative;
  main {
    padding: 16px 40px 0;
    @media ${({ theme }) => theme.devices.mobile} {
      padding: 16px 20px 0;
    }
  }
  @media ${({ theme }) => theme.devices.mobile} {
    width: 100%;
  }
`;

export default NoNavigationLayout;
