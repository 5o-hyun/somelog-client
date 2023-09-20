import React from 'react';
import { Badge, Drawer } from 'antd';
import styled from 'styled-components';

const Category = ({ categories, onToggleCategory, onToggleSchedule }) => {
  return (
    <StyledDrawer
      title="카테고리 선택"
      placement="bottom"
      closable={false}
      onClose={onToggleCategory}
      open
    >
      {categories.map((category) => (
        <StyledBadge
          key={category.id}
          color={category.color}
          text={category.category}
          onClick={onToggleSchedule}
        />
      ))}
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
`;
const StyledBadge = styled(Badge)`
  cursor: pointer;
  width: 100%;
  padding: 6px 0;
  border-radius: 4px;

  &:not(:last-child) {
    margin-bottom: 4px;
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.gray[200]};
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
