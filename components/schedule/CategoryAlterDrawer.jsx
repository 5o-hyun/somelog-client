import { Button, Drawer } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { AiOutlineCheckCircle, AiOutlineDelete } from 'react-icons/ai';

const CategoryAlterDrawer = ({
  categories,
  categoryAlter,
  toggleOpenCategoryAlterDrawer,
  onChangeCategoryAlterInput,
  onClickCategoryMutationConfirm,
}) => {
  return (
    <>
      <StyledDrawer
        title="카테고리 편집"
        placement="right"
        onClose={toggleOpenCategoryAlterDrawer}
        open
        extra={
          <div className="deleteButton">
            <AiOutlineDelete />
          </div>
        }
      >
        <div className="categoryName">
          <input
            value={categoryAlter?.category}
            onChange={onChangeCategoryAlterInput}
          />
        </div>
        <div className="categoryColorWrapper">
          {categories.map((category) => (
            <StyledDot key={category.id} color={category.color}>
              {categoryAlter?.id === category.id && <AiOutlineCheckCircle />}
            </StyledDot>
          ))}
        </div>
        <Button
          type="primary"
          className="confirmButton"
          onClick={onClickCategoryMutationConfirm}
        >
          저장
        </Button>
      </StyledDrawer>
    </>
  );
};

const StyledDrawer = styled(Drawer)`
  height: 100vh !important;
  background-color: ${({ theme }) => theme.colors.backgroundColor} !important;
  .deleteButton {
    cursor: pointer;
    color: #ef9595;
    padding: 6px 10px;
    border-radius: 10px;
    &:hover,
    &:active,
    &:focus {
      background-color: ${({ theme }) => theme.colors.gray[200]};
    }
  }
  .categoryName {
    input {
      border-radius: 8px;
      padding: 16px 20px;
      box-sizing: border-box;
      background-color: #fff;
      border: none;
      width: 100%;
      margin-bottom: 20px;
    }
  }
  .categoryColorWrapper {
    border-radius: 8px;
    padding: 16px 20px;
    background-color: #fff;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
    margin-bottom: 20px;
  }
  .confirmButton {
    width: 100%;
  }
`;

const StyledDot = styled.div`
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    color: #fff;
    width: 70%;
    height: 70%;
  }
`;

export default CategoryAlterDrawer;
