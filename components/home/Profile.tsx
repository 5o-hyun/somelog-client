import React from 'react';
import { GoPerson } from 'react-icons/go';
import styled from 'styled-components';

const Profile = () => {
  return (
    <Container>
      <div className="profile">
        <div className="avatar men">
          <GoPerson />
        </div>
        <p className="userName">이름</p>
      </div>
      <div className="moodContainer">
        <p className="moodTitle">오늘의 기분</p>
        <div className="moodWrapper">
          <div className="mood">
            <img src="/images/home/mood1.png" />
          </div>
          <div className="icon">
            <img src="/images/home/mood-love.png" />
          </div>
          <div className="mood">
            <img src="/images/home/mood8.png" />
          </div>
        </div>
      </div>
      <div className="profile">
        <div className="avatar">
          <GoPerson />
        </div>
        <p className="userName">이름</p>
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
      width: 64px;
      height: 64px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px dashed ${({ theme }) => theme.colors.subColor};
      padding: 10px;
      &.men {
        border-color: ${({ theme }) => theme.colors.textColor};
      }
      @media ${({ theme }) => theme.devices.mobile} {
        width: 50px;
        height: 50px;
      }
      svg {
        color: ${({ theme }) => theme.colors.gray[400]};
        width: 60%;
        height: 60%;
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
        background-color: #ffc5c5;
        cursor: pointer;
        @media ${({ theme }) => theme.devices.mobile} {
          width: 40px;
          height: 40px;
        }
        img {
          width: 95%;
          height: auto;
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

export default Profile;
