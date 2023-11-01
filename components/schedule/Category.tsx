import { Categories } from '@/types/category';
import { Badge, Drawer } from 'antd';
import React from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import styled from 'styled-components';

interface CategoryProps {
  categories?: Categories;
  onClose: () => void;
}

const Category: React.FC<CategoryProps> = ({ categories, onClose }) => {
  return (
    <StyledDrawer
      title="카테고리 선택"
      placement="bottom"
      onClose={onClose}
      open
      // extra={<BsFillPlusCircleFill />}
    >
      {categories?.map((category) => (
        <StyledBadge
          key={category.id}
          color={category.color}
          text={category.category}
        />
      ))}
    </StyledDrawer>
  );
};
const StyledDrawer = styled(Drawer)`
  width: 576px !important;
  margin: 0 auto;
  border-radius: 16px 16px 0 0;
  @media ${({ theme }) => theme.devices.mobile} {
    width: auto !important;
  }
`;
const StyledBadge = styled(Badge)`
  cursor: pointer;
  width: 100%;
  padding: 6px 0;
  border-radius: 4px;

  &:not(:last-child) {
    margin-bottom: 4px;
  }
  &:active,
  &:focus,
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }

  .ant-badge-status-text {
    font-size: 16px !important;
    @media ${({ theme }) => theme.devices.mobile} {
      font-size: 14px !important;
    }
  }
  .ant-badge-status-dot {
    width: 16px !important;
    height: 16px !important;
    @media ${({ theme }) => theme.devices.mobile} {
      width: 14px !important;
      height: 14px !important;
    }
  }
`;

export default Category;
