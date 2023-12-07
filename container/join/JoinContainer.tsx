import { createUser, login, userAddInfo } from '@lib/api/user';

import useAuthStore from '@/stores/auth';

import {
  Button,
  DatePicker,
  Input,
  Popconfirm,
  Select,
  Steps,
  message,
  theme,
} from 'antd';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { MdOutlineContentCopy } from 'react-icons/md';
import { useMutation } from 'react-query';
import shortId from 'shortid';
import styled from 'styled-components';

const JoinContainer = () => {
  const { user, loginUser, logoutUser } = useAuthStore();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  // 회원가입
  const [userInfo, setUserInfo] = useState<{
    nickname?: string;
    email?: string;
    pw?: string;
    code?: string;
  }>({
    nickname: undefined,
    email: undefined,
    pw: undefined,
    code: shortId.generate(),
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

  // 페이지 랜더링
  useEffect(() => {
    if (user?.birthday) {
      return setCurrent(2);
    }
    if (user) {
      return next();
    }
  }, []);

  // 추가정보입력
  const [addInfo, setAddInfo] = useState<{
    userId?: number;
    sex?: string;
    birthday?: string;
  }>({
    userId: user?.id,
    sex: undefined,
    birthday: undefined,
  });

  const onChangeAddInfo = (key: string, value: any) => {
    setAddInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateUserInfo = useMutation(userAddInfo, {
    onSuccess: () => {
      message.success('정보를 모두 입력하셨습니다.');
      next();
    },
    onError: (error: any) => {
      const { response } = error;
      if (error) {
        message.error(response.data);
      } else {
        message.error('추가정보를 입력할수없습니다.');
      }
    },
  });

  const onClickAddInfo = () => {
    if (!addInfo.birthday) {
      return message.error('생일을 입력해주세요');
    }
    updateUserInfo.mutate(addInfo as any);
  };

  // 연인연결

  const items = [
    {
      title: '회원가입/로그인',
      content: (
        <div className="contentsWrapper">
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
        </div>
      ),
    },
    {
      title: '추가정보',
      content: (
        <div className="contentsWrapper">
          <div className="infoWrapper">
            <div className="info">
              <p>성별</p>
              <Select
                value={addInfo?.sex}
                placeholder="성별을 선택해주세요"
                onChange={(value) => onChangeAddInfo('sex', value)}
                options={[
                  { value: 'M', label: '남자' },
                  { value: 'W', label: '여자' },
                ]}
              />
            </div>
            <div className="info">
              <p>생일</p>
              <DatePicker
                placeholder="생일을 선택해주세요"
                onChange={(date, dateString) =>
                  onChangeAddInfo('birthday', dateString)
                }
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '연인연결',
      content: (
        <div className="connectWrapper">
          <p className="title">나의 초대장 링크를 상대방에게 공유하세요</p>
          <div className="imgWrapper">
            <img src="/images/join/connect.png" alt="커플이미지" />
            <div className="codeWrapper">
              <p className="code">{user?.code}</p>
              <MdOutlineContentCopy className="copyBtn" />
            </div>
          </div>
          <div className="linkWrapper">
            <p className="linkTitle">커플 중 1명만 입력해도 연결됩니다</p>
            <p className="guide">연인의 초대장 링크 붙여넣기</p>
            <Input className="box" placeholder="두근두근" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <Container>
      <Steps current={current} items={items} />
      <div>{items[current]?.content}</div>
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
        {current === 1 && <Button>로그아웃</Button>}
        {current === 1 && (
          <Button type="primary" onClick={onClickAddInfo}>
            다음단계
          </Button>
        )}
        {current === 2 && (
          <Popconfirm
            title="돌아가면 정보를 다시 입력해야해요. 돌아가시겠습니까?"
            onConfirm={() => prev()}
            okText="돌아가기"
            cancelText="취소"
          >
            <Button>돌아가기</Button>
          </Popconfirm>
        )}
        {current === items.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success('회원가입이 완료되었습니다!')}
          >
            연결하기
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
  .connectWrapper {
    color: ${({ theme }) => theme.colors.textColor};
    margin-top: 16px;
    padding: 20px 0;
    @media ${({ theme }) => theme.devices.mobile} {
      padding: 12px;
    }
    .title {
      font-size: 18px;
      text-align: center;
      margin: 12px 0;
    }
    .imgWrapper {
      position: relative;
      .codeWrapper {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 8px;
        background-color: rgba(255, 255, 255, 0.5);
        padding: 8px 12px;
        border-radius: 12px;
        border: 2px dashed ${({ theme }) => theme.colors.primaryColor};
        .code {
          font-size: 30px;
          font-weight: bold;
          color: ${({ theme }) => theme.colors.subColor};
          cursor: pointer;
        }
        .copyBtn {
          width: 18px;
          height: 18px;
          margin-top: 4px;
          cursor: pointer;
          &:hover,
          &:active,
          &:focus {
            color: ${({ theme }) => theme.colors.primaryColor};
          }
        }
      }
    }
    .linkWrapper {
      padding-top: 20px;
      @media ${({ theme }) => theme.devices.mobile} {
        padding-top: 16px;
      }
      border-top: 1px dashed ${({ theme }) => theme.colors.gray[300]};
      .linkTitle {
        margin-bottom: 20px;
        text-align: center;
        color: ${({ theme }) => theme.colors.gray[500]};
        @media ${({ theme }) => theme.devices.mobile} {
          margin-bottom: 16px;
        }
      }
      .guide {
        margin-bottom: 8px;
      }
      .box {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }
  }
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
