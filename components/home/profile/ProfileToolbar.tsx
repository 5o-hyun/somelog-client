import Button from '@components/base/Button';

import Link from 'next/link';
import React from 'react';
import { FaPen } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import styled from 'styled-components';

interface ProfileToolbarProps {
  onClick: () => void;
}

const ProfileToolbar: React.FC<ProfileToolbarProps> = ({ onClick }) => {
  return (
    <Container>
      <Link href={'/'}>
        <Button name="돌아가기" icon={<IoIosArrowBack />} size={16} />
      </Link>
      <Button name="저장" onClick={onClick} icon={<FaPen />} />
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export default ProfileToolbar;
