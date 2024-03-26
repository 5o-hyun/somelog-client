import useToggle from '@lib/hooks/useToggle';

import Button from '@components/base/Button';

import DiarySwiperModal from './DiarySwiperModal';
import Link from 'next/link';
import React from 'react';
import { FaPen } from 'react-icons/fa6';
import { IoPlayForward } from 'react-icons/io5';
import styled from 'styled-components';

const DiaryMainToolbar = () => {
  const [isOpenSwiperModal, toggleOpenSwiperModal] = useToggle();

  return (
    <>
      <Container>
        <div className="playButton" onClick={toggleOpenSwiperModal}>
          <IoPlayForward />
          <p>폴라로이드재생</p>
        </div>
        <Link href={'/diary/create'}>
          <Button name="글쓰기" icon={<FaPen />} />
        </Link>
      </Container>
      {isOpenSwiperModal && (
        <DiarySwiperModal onClose={toggleOpenSwiperModal} />
      )}
    </>
  );
};
const Container = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  .playButton {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.textColor};
    color: ${({ theme }) => theme.colors.primaryColor};
    transition: 0.5s;
    cursor: pointer;
    &:hover,
    &:active,
    &:focus {
      background-color: ${({ theme }) => theme.colors.subColor};
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;

export default DiaryMainToolbar;
