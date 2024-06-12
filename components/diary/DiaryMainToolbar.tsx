import { Polaroids } from '@typess/diary';

import Button from '@components/base/Button';

import DiarySwiperModal from './DiarySwiperModal';
import Link from 'next/link';
import React from 'react';
import { FaPen } from 'react-icons/fa6';
import { IoPlayForward } from 'react-icons/io5';
import styled from 'styled-components';

interface DiaryMainToolbarProps {
  polaroids?: Polaroids;
  startDate?: string;
  isOpen: boolean;
  toggleOpen: () => void;
}

const DiaryMainToolbar: React.FC<DiaryMainToolbarProps> = ({
  polaroids,
  startDate,
  isOpen,
  toggleOpen,
}) => {
  return (
    <>
      <Container>
        <div className="playButton" onClick={toggleOpen}>
          <IoPlayForward />
          <p>폴라로이드재생</p>
        </div>
        <Link href={'/diary/create'}>
          <Button name="글쓰기" icon={<FaPen />} />
        </Link>
      </Container>
      {isOpen && polaroids && (
        <DiarySwiperModal
          polaroids={polaroids}
          startDate={startDate}
          onClose={toggleOpen}
        />
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
