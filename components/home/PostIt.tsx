import React from 'react';
import styled from 'styled-components';

const PostIt = () => {
  return (
    <Container>
      <img src="/images/home/postit2.png" alt="포스트잇" />
      <div className="text">
        <p className="names">앍앍앍x퉤퉤퉤</p>
        <p className="dDay">D + 90</p>
        <p className="desc">somelog in love</p>
      </div>
    </Container>
  );
};
const Container = styled.div`
  position: absolute;
  left: -20px;
  bottom: -50px;
  z-index: 1;
  @media ${({ theme }) => theme.devices.mobile} {
    left: -10px;
  }
  img {
    width: 200px;
    @media ${({ theme }) => theme.devices.mobile} {
      width: 150px;
    }
  }
  .text {
    position: absolute;
    top: 50%;
    left: 45%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    gap: 8px;
    p {
      text-align: center;
      &.names {
        line-height: 1.2;
      }
      &.desc {
        font-size: 14px;
        color: ${({ theme }) => theme.colors.gray[600]};
      }
    }
  }
`;

export default PostIt;
