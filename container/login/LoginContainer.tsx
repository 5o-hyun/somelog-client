import { login } from '@lib/api/user';

import { Button, Input, message } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BsSearchHeart } from 'react-icons/bs';
import { useMutation } from 'react-query';
import styled from 'styled-components';

const LoginContainer = () => {
  const router = useRouter();
  const [user, setUser] = useState<{
    email?: string;
    pw?: string;
  }>({
    email: undefined,
    pw: undefined,
  });

  const onChangeInput = (key: string, value: string) => {
    setUser((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const userLogin = useMutation(login, {
    onSuccess: () => {
      message.success('로그인 되었습니다.');
      router.push('/join');
    },
    onError: (err: any) => {
      message.error(err.response.data);
    },
  });

  const onLogin = () => {
    userLogin.mutate(user as any);
  };

  return (
    <Container>
      <p className="title">로그인</p>
      <div className="contentsWrapper">
        <div className="contents">
          <p className="contentsTitle">이메일</p>
          <Input
            value={user?.email}
            onChange={(e) => onChangeInput('email', e.target.value)}
            placeholder="이메일"
          />
        </div>
        <div className="contents">
          <p className="contentsTitle">비밀번호</p>
          <Input
            value={user?.pw}
            onChange={(e) => onChangeInput('pw', e.target.value)}
            placeholder="비밀번호"
          />
        </div>
        <div className="contents">
          <Button type="primary" className="confirmButton" onClick={onLogin}>
            로그인
          </Button>
        </div>
        <div className="buttonWrapper">
          <Link href={'/join'}>
            <Button>계정생성</Button>
          </Link>
          <Button>비밀번호 분실</Button>
        </div>
        <div className="question">
          <BsSearchHeart />
          &nbsp;사용하던 계정의 이메일을 모르겠어요.
        </div>
        <p className="agree">
          로그인을 함으로써 썸로그의 <a href="#none">개인정보 취급방침</a>
          ,&nbsp;
          <a href="#none">서비스 이용약관</a>에 동의합니다.
        </p>
      </div>
    </Container>
  );
};
const Container = styled.div`
  .title {
    text-align: center;
    font-size: 20px;
    margin: 16px 0;
  }
  .contentsWrapper {
    padding: 20px;
    border: 1px dashed ${({ theme }) => theme.colors.gray[300]};
    display: flex;
    flex-direction: column;
    gap: 12px;
    .contents {
      display: flex;
      flex-direction: column;
      gap: 8px;
      .confirmButton {
        font-size: 16px;
      }
    }
    .buttonWrapper {
      display: flex;
      justify-content: space-between;
    }
    .question {
      font-size: 14px;
      cursor: pointer;
      &:hover,
      &:active {
        color: ${({ theme }) => theme.colors.subColor};
      }
      svg {
        color: ${({ theme }) => theme.colors.subColor};
      }
    }
    .agree {
      text-align: center;
      margin-top: 20px;
      font-size: 14px;
      line-height: 1.4;
      a {
        color: ${({ theme }) => theme.colors.primaryColor};
        text-decoration: underline;
        text-underline-offset: 4px;
      }
    }
  }
`;

export default LoginContainer;
