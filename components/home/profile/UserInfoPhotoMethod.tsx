import { Button, Drawer, Upload } from 'antd';
import React from 'react';
import styled from 'styled-components';

interface UserInfoPhotoMethodProps {
  onChange: (file: any) => void;
  onRemove: () => void;
  onClose: () => void;
}

const UserInfoPhotoMethod: React.FC<UserInfoPhotoMethodProps> = ({
  onChange,
  onRemove,
  onClose,
}) => {
  return (
    <StyledDrawer open onClose={onClose} placement="bottom" closable={false}>
      <Upload maxCount={1} onChange={(e) => onChange(e)}>
        <StyledButton type="primary">앨범에서 사진 업로드</StyledButton>
      </Upload>
      <StyledButton type="default" onClick={onRemove}>
        기본 이미지 변경
      </StyledButton>
    </StyledDrawer>
  );
};
const StyledDrawer = styled(Drawer)`
  width: 576px !important;
  margin: 0 auto;
  border-radius: 8px 8px 0 0;
  @media ${({ theme }) => theme.devices.mobile} {
    width: 100% !important;
  }
  .ant-upload {
    width: 100%;
    margin-bottom: 12px;
    @media ${({ theme }) => theme.devices.mobile} {
      margin-bottom: 8px;
    }
  }
`;
const StyledButton = styled(Button)`
  width: 100%;
  height: 40px;
  font-size: 16px;
  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 14px;
    height: 36px;
  }
`;

export default UserInfoPhotoMethod;
