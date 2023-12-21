import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';

const UserDangerZone = () => {
  return (
    <Container>
      <p className="dangerZoneTitle">위험구역</p>
      <div className="dangerZoneWrapper">
        <div className="dangerZoneContent">
          <div>
            <p className="dangerZoneGuideTitle">연인 연결끊기</p>
            <p className="dangerZoneGuideDesc">
              연인과의 연결을 끊습니다. 계정은 존재하므로 나중에 다시 연결이
              가능합니다.
            </p>
          </div>
          <Button className="dangerZoneButton">연결끊기</Button>
        </div>
        <div className="dangerZoneContent">
          <div>
            <p className="dangerZoneGuideTitle">회원 탈퇴하기</p>
            <p className="dangerZoneGuideDesc">
              연인과의 연결을 끊고, 계정을 삭제합니다. 다시는 복구할수없습니다.
            </p>
          </div>
          <Button className="dangerZoneButton">회원탈퇴</Button>
        </div>
      </div>
    </Container>
  );
};
const Container = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.gray[200]};
  padding-top: 16px;
  margin-top: 16px;
  .dangerZoneTitle {
    font-size: 18px;
    width: fit-content;
    box-shadow: inset 0px -0.5em 0 0 #ffd6d6;
    margin-bottom: 12px;
  }
  .dangerZoneWrapper {
    border: 1px solid #ff9d9d;
    border-radius: 20px;
    padding: 16px 20px;
    .dangerZoneContent {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      &:not(:last-child) {
        border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
        margin-bottom: 12px;
        padding-bottom: 12px;
      }
      .dangerZoneGuideTitle {
        margin-bottom: 8px;
      }
      .dangerZoneGuideDesc {
        font-size: 14px;
        line-height: 1.4;
        color: ${({ theme }) => theme.colors.gray[600]};
      }
      .dangerZoneButton {
        color: red;
        &:hover,
        &:focus,
        &:active {
          background-color: #ffeeee;
        }
      }
    }
  }
`;

export default UserDangerZone;
