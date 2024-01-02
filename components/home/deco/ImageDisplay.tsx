import useToggle from '@lib/hooks/useToggle';

import { PlusOutlined } from '@ant-design/icons';

import { Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import AWS from 'aws-sdk';
import React, { useState } from 'react';
import styled from 'styled-components';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface ImageDisplayProps {
  files: any;
  onChange: (e: any) => void;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ files, onChange }) => {
  const [isOpenPreview, toggleOpenPreview] = useToggle();
  const [previewImage, setPreviewImage] = useState('');

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    toggleOpenPreview();
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Container>
      <p className="imageTitle">
        배경 사진{' '}
        <span className="imageDesc">
          *저장 버튼을 누르지않으면 설정이 저장되지 않습니다.
        </span>
      </p>
      <div className="uploadImageWrapper">
        <Upload
          listType="picture-card"
          fileList={files}
          multiple
          onPreview={handlePreview}
          onChange={(e) => onChange(e)}
        >
          {files?.length >= 6 ? null : uploadButton}
        </Upload>
        <Modal
          open={isOpenPreview}
          title="이미지 미리보기"
          footer={null}
          onCancel={toggleOpenPreview}
        >
          <img
            style={{ width: '100%' }}
            src={previewImage}
            alt="이미지 미리보기"
          />
        </Modal>
      </div>
    </Container>
  );
};
const Container = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.gray[200]};
  padding-top: 20px;
  .imageTitle {
    margin-bottom: 8px;
  }
  .imageDesc {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.gray[500]};
    margin-bottom: 12px;
  }
  .uploadImageWrapper {
  }
`;

export default ImageDisplay;
