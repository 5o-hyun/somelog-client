import useToggle from '@lib/hooks/useToggle';

import { CommentOutlined } from '@ant-design/icons';

import { FloatButton } from 'antd';
import Link from 'next/link';
import React from 'react';
import { BiCalendarHeart } from 'react-icons/bi';
import {
  BsBox2Heart,
  BsChatHeart,
  BsHouseHeart,
  BsPostcardHeart,
  BsShop,
} from 'react-icons/bs';
import { GoPlus } from 'react-icons/go';
import { LiaUserEditSolid } from 'react-icons/lia';
import styled from 'styled-components';

const FloatButtons: React.FC = () => {
  const [isOpenMenu, toggleOpenMenu] = useToggle();

  return (
    <>
      <Container
        trigger="click"
        type="primary"
        icon={<GoPlus />}
        onClick={() => toggleOpenMenu()}
      >
        <Link href={'#'}>
          <FloatButton description="마켓" icon={<BsShop />} />
        </Link>
        <Link href={'/home/deco'}>
          <FloatButton description="홈꾸미기" icon={<BsHouseHeart />} />
        </Link>
        <Link href={'/home/profile'}>
          <FloatButton description="프로필" icon={<LiaUserEditSolid />} />
        </Link>
        <Link href={'/schedule'}>
          <FloatButton description="일정관리" icon={<BiCalendarHeart />} />
        </Link>
        <Link href={'/chat'}>
          <FloatButton description="채팅" icon={<BsChatHeart />} />
        </Link>
        <Link href={'/diary'}>
          <FloatButton description="다이어리" icon={<BsPostcardHeart />} />
        </Link>
        <Link href={'/memo'}>
          <FloatButton description="메모함" icon={<BsBox2Heart />} />
        </Link>
        <Link href={'#'}>
          <FloatButton description="문의하기" icon={<CommentOutlined />} />
        </Link>
      </Container>
      <Background
        onClick={() => toggleOpenMenu()}
        className={isOpenMenu ? 'show' : ''}
      />
    </>
  );
};
const Container = styled(FloatButton.Group)`
  position: absolute;
  bottom: 80px;
  .ant-float-btn-group-wrap {
    display: flex;
    flex-direction: column;
    gap: 10px;
    button,
    a {
      background-color: transparent;
      .ant-float-btn-body {
        background-color: ${({ theme }) => theme.colors.gray[700]};
        &:hover,
        &:active,
        &:focus {
          background-color: ${({ theme }) => theme.colors.primaryColor};
          .ant-float-btn-description {
            color: ${({ theme }) => theme.colors.primaryColor};
          }
        }
      }
    }
  }
  .ant-float-btn {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media ${({ theme }) => theme.devices.mobile} {
      width: 40px;
      height: 40px;
    }
    .ant-float-btn-body {
      width: 100% !important;
      height: 100% !important;
      .ant-float-btn-description {
        position: absolute;
        right: 60px;
        width: max-content;
        font-size: 18px;
        color: ${({ theme }) => theme.colors.white};
        @media ${({ theme }) => theme.devices.mobile} {
          font-size: 16px;
        }
      }
      .ant-float-btn-icon {
        width: auto;
        svg {
          width: 24px;
          height: 24px;
          color: ${({ theme }) => theme.colors.white};
          @media ${({ theme }) => theme.devices.mobile} {
            width: 20px;
            height: 20px;
          }
        }
        .anticon-close {
          svg {
            width: 18px;
            height: 18px;
            @media ${({ theme }) => theme.devices.mobile} {
              width: 14px;
              height: 14px;
            }
          }
        }
      }
    }
  }
`;
const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
  display: none;
  &.show {
    display: block;
  }
`;

export default FloatButtons;
