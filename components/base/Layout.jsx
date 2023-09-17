import { Main } from 'next/document';
import React from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';

const Layout = ({ children }) => {
  return (
    <Container>
      <main>{children}</main>
      <Navigation />
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

export default Layout;
