import { Drawer } from 'antd';
import React from 'react';
import styled from 'styled-components';

interface StickerListProps {
  stickers: {
    id: number;
    imagePath: string;
  }[];
  onClose: () => void;
  onClick: (id: number) => void;
}

const StickerList: React.FC<StickerListProps> = ({
  stickers,
  onClose,
  onClick,
}) => {
  return (
    <StyledDrawer
      title="스티커 고르기"
      placement="bottom"
      onClose={onClose}
      open
    >
      <div className="stickerWrapper">
        {stickers.map((sticker) => (
          <div
            className="sticker"
            key={sticker.id}
            onClick={() => onClick(sticker.id)}
          >
            <img src={sticker.imagePath} alt={`${sticker.id}`} />
          </div>
        ))}
      </div>
    </StyledDrawer>
  );
};
const StyledDrawer = styled(Drawer)`
  width: 280px !important;
  margin: 0 auto;
  border-radius: 16px 16px 0 0;
  .stickerWrapper {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 12px;
    .sticker {
      border: 1px solid ${({ theme }) => theme.colors.gray[400]};
      aspect-ratio: 1/1;
      border-radius: 50%;
      overflow: hidden;
      display: grid;
      place-items: center;
      cursor: pointer;
      &:hover {
        background-color: ${({ theme }) => theme.colors.gray[100]};
      }
      img {
        display: block;
        width: 70%;
        height: 70%;
      }
    }
  }
`;
export default StickerList;
