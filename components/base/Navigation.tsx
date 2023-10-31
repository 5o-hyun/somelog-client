import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { navigationMenu } from '@lib/data/navigationMenus';

const Navigation = () => {
  const router = useRouter();

  return (
    <Container>
      <ul className="wrapper">
        {navigationMenu.map((menu) => (
          <li key={menu.id}>
            <Link href={menu.link}>
              <div
                className={
                  menu.link === router.pathname ? 'active iconBox' : 'iconBox'
                }
              >
                {menu.icon}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
};

const Container = styled.nav`
  width: inherit;
  height: 50px;
  position: fixed;
  bottom: 0;
  padding: 0 40px;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 10;
  ${({ theme }) => theme.flex.center};
  @media ${({ theme }) => theme.devices.mobile} {
    padding: 0 20px;
  }
  .wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .iconBox {
      svg {
        color: ${({ theme }) => theme.colors.color};
        &:nth-child(1),
        &:nth-child(2),
        &:nth-child(4) {
          width: 30px;
          height: 30px;
          @media ${({ theme }) => theme.devices.mobile} {
            width: 26px;
            height: 26px;
          }
        }
        &:nth-child(3),
        &:nth-child(5) {
          width: 26px;
          height: 26px;
          @media ${({ theme }) => theme.devices.mobile} {
            width: 24px;
            height: 24px;
          }
        }
      }
      &.active svg {
        color: ${({ theme }) => theme.colors.primaryColor};
      }
    }
  }
`;

export default Navigation;
