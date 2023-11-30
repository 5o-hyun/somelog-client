import { createUser } from '@lib/api/user';

import { Button, DatePicker, Input, Select, Steps, message, theme } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';

const JoinContainer = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const [userInfo, setUserInfo] = useState<{
    nickname?: string;
    email?: string;
    pw?: string;
  }>({
    nickname: undefined,
    email: undefined,
    pw: undefined,
  });
  const [pwCheck, setPwCheck] = useState('');

  const onChangeCreateInfo = (key: string, value: any) => {
    setUserInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const createUserInfo = useMutation(createUser, {
    onSuccess: () => {
      message.success('계정이 생성되었습니다.');
      setCurrent(current + 1);
    },
    onError: (error: any) => {
      const { response } = error;
      if (error) {
        message.error(response.data);
      } else {
        message.error('계정을 생성할수없습니다.');
      }
    },
  });

  const onSubmitCreateUser = () => {
    console.log(userInfo);
    if (!userInfo.nickname) {
      return message.error('닉네임을 입력해주세요');
    }
    if (!userInfo.email) {
      return message.error('이메일을 입력해주세요');
    }
    if (!userInfo.pw) {
      return message.error('비밀번호를 입력해주세요');
    }
    if (!pwCheck) {
      return message.error('비밀번호 확인을 입력해주세요');
    }
    if (userInfo.pw.length < 6) {
      return message.error('비밀번호는 6자리이상 입력해주세요');
    }
    if (userInfo.pw !== pwCheck) {
      return message.error('비밀번호가 일치하지 않습니다.');
    }
    createUserInfo.mutate(userInfo as any);
  };

  const items = [
    {
      title: '회원가입/로그인',
      content: (
        <>
          <div className="infoWrapper">
            <div className="info">
              <p>이름(닉네임)</p>
              <Input
                value={userInfo?.nickname}
                onChange={(e) => onChangeCreateInfo('nickname', e.target.value)}
                placeholder="이름(닉네임)을 입력해주세요"
              />
            </div>
            <div className="info">
              <p>이메일</p>
              <Input
                value={userInfo?.email}
                onChange={(e) => onChangeCreateInfo('email', e.target.value)}
                placeholder="이메일로 계정을 잃어버렸거나 폰을 바꿔도 사용할수있습니다"
              />
            </div>
            <div className="info">
              <p>비밀번호</p>
              <Input
                value={userInfo?.pw}
                onChange={(e) => onChangeCreateInfo('pw', e.target.value)}
                placeholder="비밀번호를 입력해주세요"
              />
            </div>
            <div className="info">
              <p>비밀번호확인</p>
              <Input
                value={pwCheck}
                onChange={(e) => setPwCheck(e.target.value)}
                placeholder="비밀번호를 다시 입력해주세요"
              />
            </div>
          </div>
        </>
      ),
    },
    {
      title: '추가정보',
      content: (
        <div className="infoWrapper">
          <div className="info">
            <p>성별</p>
            <Select
              defaultValue="M"
              // onChange={handleChange}
              options={[
                { value: 'M', label: '남자' },
                { value: 'W', label: '여자' },
              ]}
            />
          </div>
          <div className="info">
            <p>생일</p>
            <DatePicker
            // onChange={onChange}
            />
          </div>
        </div>
      ),
    },
    {
      title: '완료',
      content: 'Last-content',
    },
  ];

  return (
    <Container>
      <Steps current={current} items={items} />
      <div className="contentsWrapper">{items[current].content}</div>
      <div className="buttonWrapper">
        {/* 1단계 */}
        {current === 0 && (
          <Link href={'/login'}>
            <Button>로그인</Button>
          </Link>
        )}
        {current === 0 && (
          <Button type="primary" onClick={onSubmitCreateUser}>
            계정생성
          </Button>
        )}
        {/* 2단계 */}
        {current > 0 && <Button onClick={() => prev()}>돌아가기</Button>}
        {current > 0 && (
          <Button type="primary" onClick={() => next()}>
            다음단계
          </Button>
        )}
        {current === items.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success('회원가입이 완료되었습니다!')}
          >
            완료
          </Button>
        )}
      </div>
      {current === 0 && (
        <p className="agree">
          회원가입을 함으로써 썸로그의 <a href="#none">개인정보 취급방침</a>
          ,&nbsp;
          <a href="#none">서비스 이용약관</a>에 동의합니다.
        </p>
      )}
    </Container>
  );
};
const Container = styled.div`
  .contentsWrapper {
    color: ${({ theme }) => theme.colors.textColor};
    border: 1px dashed ${({ theme }) => theme.colors.gray[300]};
    margin-top: 16px;
    padding: 20px;
    @media ${({ theme }) => theme.devices.mobile} {
      padding: 12px;
    }
    .infoWrapper {
      display: flex;
      flex-direction: column;
      gap: 12px;
      @media ${({ theme }) => theme.devices.mobile} {
        gap: 8px;
      }
      .info {
        display: flex;
        flex-direction: column;
        gap: 8px;
        @media ${({ theme }) => theme.devices.mobile} {
          gap: 4px;
        }
      }
    }
  }
  .buttonWrapper {
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
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
`;

export default JoinContainer;
