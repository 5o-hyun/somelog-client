import React from 'react';
import styled from 'styled-components';

const Anniversary = () => {
  return (
    <Container>
      <div className="headLine">
        <img src="/images/home/line-love.png" />
      </div>
      <div className="contentsWrapper">
        <div className="contents">
          <div className="left">
            <div className="icon"></div>
            <span className="title">생일</span>
          </div>
          <div className="date">D - 43</div>
        </div>
        <div className="contents">
          <div className="left">
            <div className="icon"></div>
            <span className="title">100일</span>
          </div>
          <div className="date">D - 102</div>
        </div>
      </div>
      <div className="bottomLine">
        <img src="/images/home/line-love.png" />
      </div>
    </Container>
  );
};
const Container = styled.div`
  margin-bottom: 20px;
  padding: 0 60px;
  @media ${({ theme }) => theme.devices.mobile} {
    padding: 0 40px;
  }
  .contentsWrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 12px 0;
    .contents {
      display: flex;
      justify-content: space-between;
      .left {
        display: flex;
        align-items: center;
        gap: 8px;
        .icon {
          width: 20px;
          height: 20px;
          background-color: gray;
        }
      }
      .date {
        min-width: 60px;
      }
    }
  }
`;

export default Anniversary;
