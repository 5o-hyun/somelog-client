import { getMemo, updateMemo } from '@lib/api/memo';

import { Memo } from '@typess/memo';

import Button from '@components/base/Button';
import Title from '@components/base/Title';

import { Input, Popconfirm, message } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import { useMutation, useQuery } from 'react-query';
import styled from 'styled-components';

const MemoUpdateContainer = () => {
  const router = useRouter();
  const memoId = Number(router.query.id);

  const { data: memo } = useQuery<Memo>(['schedule', memoId], () =>
    getMemo(memoId),
  );

  const [info, setInfo] = useState<Memo>({
    id: undefined,
    title: undefined,
    detail: undefined,
  });

  useEffect(() => {
    if (memo) {
      setInfo(memo);
    }
  }, [memo]);

  const onChangeMemo = (key: string, value: string) => {
    setInfo((prevInfo) => ({
      ...prevInfo,
      [key]: value,
    }));
  };

  const updateMemoMutation = useMutation(updateMemo, {
    onSuccess: () => {
      message.success('메모를 수정했습니다.');
      router.push(`/memo/${memoId}`);
    },
    onError: () => {
      message.error('메모를 삭제했습니다.');
    },
  });

  const onSave = () => {
    updateMemoMutation.mutate(info as any);
  };

  return (
    <Container>
      <Title name="수정하기" />
      <div className="toolBar">
        <Link href={`/memo/${memoId}`}>
          <Button name="돌아가기" icon={<IoIosArrowBack />} size={16} />
        </Link>
        <div className="right">
          <Popconfirm
            title="수정하시겠습니까?"
            okText="수정"
            cancelText="취소"
            onConfirm={onSave}
          >
            <Button name="수정" icon={<FaPen />} size={16} />
          </Popconfirm>
        </div>
      </div>
      <Input
        placeholder="제목을 입력해주세요."
        size="large"
        className="memoUpdateToolbarTitle"
        value={info?.title}
        onChange={(e) => onChangeMemo('title', e.target.value)}
      />
      <Input.TextArea
        placeholder="남기고 싶은 메모를 작성해보세요."
        rows={20}
        size="large"
        className="memoUpdateToolbarText"
        value={info?.detail}
        onChange={(e) => onChangeMemo('detail', e.target.value)}
      />
    </Container>
  );
};
const Container = styled.div`
  .toolBar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    .right {
      display: flex;
      gap: 8px;
    }
  }
  .memoUpdateToolbarTitle {
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
  .memoUpdateToolbarText {
    padding: 20px 24px;
    &:hover {
      border-color: ${({ theme }) => theme.colors.subColor};
    }
    @media ${({ theme }) => theme.devices.mobile} {
      padding: 12px 16px;
    }
  }
`;

export default MemoUpdateContainer;
