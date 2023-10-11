import React from 'react';
import { Badge, Drawer } from 'antd';
import styled from 'styled-components';

const Category = ({
  categories,
  toggleOpenCategory,
  toggleCategoryAlterMode,
  categoryAlterMode,
  onSelectCategory,
  onAlterCategory,
}) => {
  return (
    <StyledDrawer
      title={
        <div className="categoryTitleWrapper">
          <p>{categoryAlterMode ? '카테고리 편집' : '카테고리 선택'}</p>
          <p
            className="categoryAlter"
            onClick={() => toggleCategoryAlterMode()}
          >
            {categoryAlterMode ? '완료' : '편집'}
          </p>
        </div>
      }
      placement="bottom"
      closable={false}
      onClose={toggleOpenCategory}
      open
    >
      {!categoryAlterMode && (
        <>
          {categories.map((category) => (
            <StyledBadge
              key={category.id}
              color={category.color}
              text={category.category}
              onClick={() => onSelectCategory(category)}
            />
          ))}
        </>
      )}
      {categoryAlterMode && (
        <>
          {categories.map((category) => (
            <StyledBadge
              key={category.id}
              color={category.color}
              text={category.category}
              onClick={() => onAlterCategory(category)}
            />
          ))}
          <StyledBadge
            color="#ddd"
            text="+ 추가"
            onClick={() => onAlterCategory()}
          />
        </>
      )}
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
  .categoryTitleWrapper {
    display: flex;
    justify-content: space-between;
    .categoryAlter {
      color: ${({ theme }) => theme.colors.primaryColor};
      cursor: pointer;
    }
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
