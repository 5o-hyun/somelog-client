import useAuthStore from '@/stores/auth';

import React from 'react';
import { FaHeartCirclePlus } from 'react-icons/fa6';
import { GoPerson } from 'react-icons/go';
import styled from 'styled-components';

interface ProfileProps {
  toggleOpenMoodModal: () => void;
}

const Profile: React.FC<ProfileProps> = ({ toggleOpenMoodModal }) => {
  const { user } = useAuthStore();

  return (
    <Container>
      {/* 상대방 프로필 */}
      <div className="profile">
        <div className="avatar men">
          {user?.partner.photo ? (
            <img
              src={`${process.env.NEXT_PUBLIC_S3URL}${user.partner.photo}`}
              alt="상대방사진"
              className="photo"
            />
          ) : (
            <GoPerson />
          )}
        </div>
        <p className="userName">{user?.partner.nickname}</p>
      </div>
      <div className="moodContainer">
        <p className="moodTitle">오늘의 기분</p>
        <div className="moodWrapper">
          {/* 상대방 기분 */}
          <div className="mood">
            {user?.partner.moodEmoji ? (
              <ImgWrapper
                color={
                  user.partner.moodColor
                    ? user.partner.moodColor
                    : 'transparent'
                }
              >
                <img src={user.partner.moodEmoji} />
              </ImgWrapper>
            ) : (
              <FaHeartCirclePlus />
            )}
          </div>
          <div className="icon">
            <img src="/images/home/mood-love.png" />
          </div>
          {/* 내 기분 */}
          <div className="mood" onClick={toggleOpenMoodModal}>
            {user?.moodEmoji ? (
              <ImgWrapper
                color={user.moodColor ? user.moodColor : 'transparent'}
              >
                <img src={user?.moodEmoji} />
              </ImgWrapper>
            ) : (
              <FaHeartCirclePlus />
            )}
          </div>
        </div>
      </div>
      {/* 내 프로필 */}
      <div className="profile">
        <div className="avatar">
          {user?.photo ? (
            <img
              src={`${process.env.NEXT_PUBLIC_S3URL}${user.photo}`}
              alt="내사진"
              className="photo"
            />
          ) : (
            <GoPerson />
          )}
        </div>
        <p className="userName">{user?.nickname}</p>
      </div>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px dashed ${({ theme }) => theme.colors.subColor};
      overflow: hidden;
      &.men {
        border-color: ${({ theme }) => theme.colors.textColor};
      }
      @media ${({ theme }) => theme.devices.mobile} {
        width: 60px;
        height: 60px;
      }
      .photo {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      svg {
        color: ${({ theme }) => theme.colors.gray[400]};
        width: 50%;
        height: 50%;
      }
    }
    .userName {
    }
  }
  .moodContainer {
    flex: 1;
    .moodTitle {
      margin-bottom: 12px;
      text-align: center;
    }
    .moodWrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
      width: 100%;
      @media ${({ theme }) => theme.devices.mobile} {
        gap: 12px;
      }
      .mood {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        border: 1px solid ${({ theme }) => theme.colors.gray[200]};
        cursor: pointer;
        overflow: hidden;
        @media ${({ theme }) => theme.devices.mobile} {
          width: 40px;
          height: 40px;
        }
        img {
          width: 95%;
          height: auto;
        }
        svg {
          width: 40%;
          height: 40%;
          color: ${({ theme }) => theme.colors.gray[300]};
        }
      }
      .icon {
        width: 90px;
        height: 90px;
        @media ${({ theme }) => theme.devices.mobile} {
          width: 50px;
          height: 50px;
        }
      }
    }
  }
`;
const ImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
`;

export default Profile;
