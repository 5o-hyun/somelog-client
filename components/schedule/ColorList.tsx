import { Colors } from '@typess/color';

import { Badge, Drawer, Tooltip } from 'antd';
import React from 'react';
import styled from 'styled-components';

interface ColorListProps {
  colors?: Colors;
  onClick: (value: string) => void;
  onClose: () => void;
}

const ColorList: React.FC<ColorListProps> = ({ colors, onClick, onClose }) => {
  return (
    <StyledDrawer title="색상 고르기" placement="bottom" onClose={onClose} open>
      <div className="colorWrapper">
        {colors?.map((color) => (
          <Tooltip title={color.name} color={color.color} key={color.id}>
            <ColorSheet
              color={color.color}
              //@ts-ignore
              onClick={() => onClick(color.color)}
            />
          </Tooltip>
        ))}
      </div>
    </StyledDrawer>
  );
};
const StyledDrawer = styled(Drawer)`
  width: 280px !important;
  margin: 0 auto;
  border-radius: 16px 16px 0 0;
  .colorWrapper {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 12px;
  }
`;
const ColorSheet = styled.div`
  cursor: pointer;
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: ${(props) => props.color};
  padding: 6px 0;
  border-radius: 50%;
`;

export default ColorList;
