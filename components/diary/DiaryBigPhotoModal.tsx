import { Modal } from 'antd';
import React from 'react';
import styled from 'styled-components';

interface DiaryBigPhotoModalProps {
  onClose: () => void;
}

const DiaryBigPhotoModal: React.FC<DiaryBigPhotoModalProps> = ({ onClose }) => {
  return (
    <StyledModal open onCancel={onClose}>
      <img src="https://via.placeholder.com/1040x680" alt="이미지 확대" />
    </StyledModal>
  );
};
const StyledModal = styled(Modal)`
  .ant-modal-footer {
    display: none;
  }
`;

export default DiaryBigPhotoModal;
