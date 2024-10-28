import { createUser, login, userAddInfo, userConnect } from '@lib/api/user';

import useAuthStore from '@/stores/auth';

import {
  Button,
  DatePicker,
  Input,
  Popconfirm,
  Select,
  Steps,
  message,
} from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { MdOutlineContentCopy } from 'react-icons/md';
import { useMutation } from 'react-query';
import shortId from 'shortid';
import styled from 'styled-components';

const JoinContainer = () => {
  const router = useRouter();
  const { user, loginUser, logoutUser } = useAuthStore();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  // 페이지 랜더링
  useEffect(() => {
    if (user?.partner) {
      window.location.href = '/';
    }
    if (user?.birthday) {
      return setCurrent(2);
    }
    if (user) {
      setAddInfo((prev) => ({
        ...prev,
        userId: user.id,
      }));
      setCurrent(1);
    }
  }, [user]);

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
      window.location.href = '/join';
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
  const onClickCopy = async (number?: string) => {
    try {
      if (number) await navigator.clipboard.writeText(number);
      message.success('클립보드에 복사되었습니다');
    } catch (e) {
      message.error('복사에 실패하였습니다');
    }
  };

  const [copyNumber, setCopyNumber] = useState<string | undefined>(undefined);
  const onChangeCopyNumber = (copyNumber: string) => {
    setCopyNumber(copyNumber);
  };
  const connect = useMutation(userConnect, {
    onSuccess: () => {
      message.success('연인이 연결되었습니다.');
      router.push('/');
    },
    onError: (error: any) => {
      const { response } = error;
      if (error) {
        message.error(response.data);
      } else {
        message.error('알수없는 오류로 연결할수없습니다.');
      }
    },
  });
  const onClickConnect = () => {
    if (!copyNumber) {
      return message.error('연인의 초대장 링크를 입력해주세요');
    }
    connect.mutate({ userId: user?.id, code: copyNumber });
  };

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
          <Link href={'/'}>
            <div className="homeButton">
              <p>썸로그 이용하러 가기</p>
              <span>*커플연결이 안되면 이용에 불편함이 있을 수 있습니다.</span>
            </div>
          </Link>
          <p className="title">나의 초대장 링크를 상대방에게 공유하세요</p>
          <div className="imgWrapper">
            <img src="/images/join/connect.png" alt="커플이미지" />
            <div className="codeWrapper">
              <p className="code" onClick={() => onClickCopy(user?.code)}>
                {user?.code}{' '}
                <MdOutlineContentCopy
                  onClick={() => onClickCopy(user?.code)}
                  className="copyBtn"
                />
              </p>
            </div>
          </div>
          <div className="linkWrapper">
            <p className="linkTitle">커플 중 1명만 입력해도 연결됩니다</p>
            <p className="guide">연인의 초대장 링크 붙여넣기</p>
            <Input
              onChange={(e) => onChangeCopyNumber(e.target.value)}
              className="box"
              placeholder="여기에 상대방의 코드를 넣어주세요!"
            />
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
          <Button type="primary" onClick={onClickConnect}>
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
        width: max-content;
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
          cursor: pointer;
          &:hover,
          &:active,
          &:focus {
            color: ${({ theme }) => theme.colors.primaryColor};
            .copyBtn {
              color: ${({ theme }) => theme.colors.primaryColor};
            }
          }
          .copyBtn {
            width: 18px;
            height: 18px;
            margin-top: 4px;
            color: ${({ theme }) => theme.colors.textColor};
            cursor: pointer;
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
  .homeButton {
    background-color: ${({ theme }) => theme.colors.primaryColor};
    border-radius: 4px;
    height: 60px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) => theme.colors.subColor};
    }
    p {
      font-size: 18px;
      margin-bottom: 4px;
      font-weight: bold;
    }
    span {
      font-size: 12px;
      color: ${({ theme }) => theme.colors.textColor};
    }
  }
`;

export default JoinContainer;
