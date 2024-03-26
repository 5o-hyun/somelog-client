import { Modal } from 'antd';
import React from 'react';

interface DiarySwiperModalProps {
  onClose: () => void;
}

const DiarySwiperModal: React.FC<DiarySwiperModalProps> = ({ onClose }) => {
  return (
    <>
      <Modal title="스와이퍼해야즤" open onCancel={onClose}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default DiarySwiperModal;
