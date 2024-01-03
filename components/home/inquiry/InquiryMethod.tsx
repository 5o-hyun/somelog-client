import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface InquiryMethodProps {
  icon: ReactElement;
  title: string;
  desc: string;
  onClick?: () => void;
}

const InquiryMethod: React.FC<InquiryMethodProps> = ({
  icon,
  title,
  desc,
  onClick,
}) => {
  return (
    <Container onClick={onClick}>
      <div className="inquiryContainer">
        <div className="icon">{icon}</div>
        <div className="wrapper">
          <p className="title">{title}</p>
          <p className="desc">{desc}</p>
        </div>
      </div>
    </Container>
  );
};
const Container = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  padding: 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${({ theme }) => theme.devices.mobile} {
    justify-content: left;
  }
  cursor: pointer;
  &:hover {
    .inquiryContainer {
      .icon {
        svg {
          color: ${({ theme }) => theme.colors.subColor};
        }
      }
      .wrapper {
        .title {
          text-decoration: underline;
          text-underline-offset: 6px;
        }
      }
    }
  }
  .inquiryContainer {
    min-width: 320px;
    display: flex;
    gap: 20px;
    @media ${({ theme }) => theme.devices.mobile} {
      min-width: auto;
    }
    .icon {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        width: 100%;
        height: 100%;
        color: ${({ theme }) => theme.colors.primaryColor};
      }
    }
    .wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 12px;
      .title {
        font-size: 24px;
        color: ${({ theme }) => theme.colors.subColor};
      }
    }
  }
`;

export default InquiryMethod;
