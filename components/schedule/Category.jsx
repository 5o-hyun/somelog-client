import React from 'react';
import { Badge, Drawer, Space } from 'antd';
import styled from 'styled-components';

const colors = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
];

const Category = ({ onToggleCategory }) => {
  return (
    <StyledDrawer
      title="카테고리 선택"
      placement="bottom"
      closable={false}
      onClose={onToggleCategory}
      open
    >
      <Space direction="vertical">
        {colors.map((color) => (
          <Badge key={color} color={color} text={color} />
        ))}
      </Space>
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

export default Category;
