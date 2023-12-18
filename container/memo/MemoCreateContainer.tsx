import { createMemo } from '@lib/api/memo';

import Title from '@components/base/Title';
import MemoCreateToolBar from '@components/memo/MemoCreateToolBar';

import useAuthStore from '@/stores/auth';

import { Input, message } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';

const MemoCreateContainer = () => {
  const router = useRouter();
  const { user } = useAuthStore();

  const [info, setInfo] = useState<{
    title?: string;
    detail?: string;
    UserId?: number;
  }>({
    title: undefined,
    detail: undefined,
    UserId: undefined,
  });

  useEffect(() => {
    setInfo((prev) => ({
      ...prev,
      UserId: user?.id,
    }));
  }, [user]);

  const onChangeInfo = (key: string, value: string) => {
    setInfo((prevInfo) => ({
      ...prevInfo,
      [key]: value,
    }));
    console.log(info);
  };

  const createMemoMutation = useMutation(createMemo, {
    onSuccess: () => {
      message.success('메모가 등록되었습니다.');
      router.push('/memo');
    },
    onError: () => {
      message.success('메모를 등록할수없습니다.');
    },
  });

  const onClickSave = () => {
    if (!info.title) {
      return message.error('제목을 입력해주세요.');
    }
    if (!info.detail) {
      return message.error('내용을 입력해주세요.');
    }
    createMemoMutation.mutate(info as any);
  };

  return (
    <Container>
      <Title name="글쓰기" />
      <MemoCreateToolBar onSave={onClickSave} />
      <Input
        placeholder="제목을 입력해주세요."
        size="large"
        className="memoCreateToolbarTitle"
        value={info.title}
        onChange={(e) => onChangeInfo('title', e.target.value)}
      />
      <Input.TextArea
        placeholder="남기고 싶은 메모를 작성해보세요."
        rows={20}
        size="large"
        className="memoCreateToolbarText"
        value={info.detail}
        onChange={(e) => onChangeInfo('detail', e.target.value)}
      />
    </Container>
  );
};
const Container = styled.div`
  .memoCreateToolbarTitle {
    padding: 12px 24px;
    margin-bottom: 12px;
    &:hover {
      border-color: ${({ theme }) => theme.colors.subColor};
    }
    @media ${({ theme }) => theme.devices.mobile} {
      padding: 12px 16px;
      margin-bottom: 8px;
    }
  }
  .memoCreateToolbarText {
    padding: 20px 24px;
    &:hover {
      border-color: ${({ theme }) => theme.colors.subColor};
    }
    @media ${({ theme }) => theme.devices.mobile} {
      padding: 12px 16px;
    }
  }
`;

export default MemoCreateContainer;
