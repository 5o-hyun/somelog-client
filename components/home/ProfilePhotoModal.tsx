import { Modal } from 'antd';
import React from 'react';
import styled from 'styled-components';

interface ProfilePhotoModalProps {
  url: string;
  onClose: () => void;
}

const ProfilePhotoModal: React.FC<ProfilePhotoModalProps> = ({
  url,
  onClose,
}) => {
  return (
    <>
      <StyledModal
        open
        onCancel={onClose}
        cancelText="닫기"
        okButtonProps={{ className: 'hide-ok-button' }}
      >
        <img src={url} alt="프로필이미지" />
      </StyledModal>
    </>
  );
};
const StyledModal = styled(Modal)`
  .hide-ok-button {
    display: none;
  }
`;

export default ProfilePhotoModal;
