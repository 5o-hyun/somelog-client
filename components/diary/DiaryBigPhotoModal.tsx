import { Modal } from 'antd';
import React from 'react';
import styled from 'styled-components';

interface DiaryBigPhotoModalProps {
  imagePath: string;
  onClose: () => void;
}

const DiaryBigPhotoModal: React.FC<DiaryBigPhotoModalProps> = ({
  imagePath,
  onClose,
}) => {
  return (
    <StyledModal open onCancel={onClose}>
      <img src={imagePath} alt="이미지 확대" />
    </StyledModal>
  );
};
const StyledModal = styled(Modal)`
  .ant-modal-footer {
    display: none;
  }
`;

export default DiaryBigPhotoModal;
