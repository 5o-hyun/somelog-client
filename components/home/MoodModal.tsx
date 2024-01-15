import { moods } from '@lib/data/moods';

import { Colors } from '@typess/color';

import useAuthStore from '@/stores/auth';

import { Modal, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface MoodModalProps {
  colors?: Colors;
  onSave: () => void;
  onChange: (key: string, value: string) => void;
  onClose: () => void;
}

const MoodModal: React.FC<MoodModalProps> = ({
  colors,
  onChange,
  onSave,
  onClose,
}) => {
  const { user } = useAuthStore();
  const [activeEmoji, setActiveEmoji] = useState<string | null>();
  const [activeColor, setActiveColor] = useState<string | null>();

  useEffect(() => {
    if (user) {
      setActiveEmoji(user.moodEmoji);
      setActiveColor(user.moodColor);
    }
  }, [user]);

  const onActive = (type: string, value: string) => {
    if (type === 'emoji') {
      setActiveEmoji(value);
    }
    if (type === 'color') {
      setActiveColor(value);
    }
  };

  return (
    <>
      <StyledModal
        title="내 오늘 기분은?"
        open
        onOk={onSave}
        okText="저장"
        onCancel={onClose}
      >
        <Tabs
          type="card"
          items={[
            {
              label: '표정',
              key: 'moodEmoji',
              children: (
                <div className="contentsWrapper">
                  {moods.map((mood) => (
                    <div
                      key={mood.id}
                      className={
                        activeEmoji === mood.imgPath
                          ? 'contents active'
                          : 'contents'
                      }
                      onClick={() => {
                        onChange('moodEmoji', mood.imgPath);
                        onActive('emoji', mood.imgPath);
                      }}
                    >
                      <img src={mood.imgPath} alt="표정" />
                    </div>
                  ))}
                </div>
              ),
            },
            {
              label: '색깔',
              key: 'moodColor',
              children: (
                <div className="contentsWrapper">
                  {colors?.map((color) => (
                    <Color
                      key={color.id}
                      color={color.color}
                      className={
                        activeColor === color.color
                          ? 'contents active'
                          : 'contents'
                      }
                      onClick={() => {
                        onChange('moodColor', color.color);
                        onActive('color', color.color);
                      }}
                    >
                      <p>{color.name}</p>
                    </Color>
                  ))}
                </div>
              ),
            },
          ]}
        />
      </StyledModal>
    </>
  );
};
const StyledModal = styled(Modal)`
  width: 400px !important;
  .contentsWrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    .contents {
      width: 60px;
      aspect-ratio: 1 / 1;
      border-radius: 50%;
      overflow: hidden;
      border: 1px solid ${({ theme }) => theme.colors.gray[200]};
      box-sizing: border-box;
      cursor: pointer;
      &:hover,
      &:active,
      &:focus {
        border: 2px solid ${({ theme }) => theme.colors.gray[600]};
      }
      &.active {
        border: 2px solid ${({ theme }) => theme.colors.gray[600]};
      }
      img {
        padding: 8px;
      }
    }
  }
  .ant-btn-default {
    display: none;
  }
`;
const Color = styled.div`
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  line-height: 1.4;
  text-align: center;
`;

export default MoodModal;
