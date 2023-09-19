import React, { useState } from 'react';
import { Button, Drawer, Radio, Space } from 'antd';
import styled from 'styled-components';

const Category = ({ onToggleCategory }) => {
  return (
    <StyledDrawer
      title="Basic Drawer"
      placement="bottom"
      closable={false}
      onClose={onToggleCategory}
      open
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </StyledDrawer>
  );
};
const StyledDrawer = styled(Drawer)`
  position: absolute;
`;

export default Category;
