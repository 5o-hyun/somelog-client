import { deleteMemo, getMemo } from '@lib/api/memo';

import { Memo } from '@typess/memo';

import Title from '@components/base/Title';
import MemoDetail from '@components/memo/MemoDetail';
import MemoDetailToolBar from '@components/memo/MemoDetailToolBar';

import { message } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { useMutation, useQuery } from 'react-query';

const MemoIdContainer = () => {
  const router = useRouter();
  const memoId = Number(router.query.id);

  const { data: memo } = useQuery<Memo>(['schedule', memoId], () =>
    getMemo(memoId),
  );

  const deleteMemoMutation = useMutation(deleteMemo, {
    onSuccess: () => {
      message.success('메모가 삭제되었습니다.');
      router.push('/memo');
    },
    onError: () => {
      message.error('존재하지 않는 메모입니다.');
    },
  });

  const onDelete = () => {
    deleteMemoMutation.mutate(memoId);
  };

  return (
    <>
      <Title name="메모장" />
      <MemoDetailToolBar onDelete={onDelete} />
      <MemoDetail memo={memo} />
    </>
  );
};

export default MemoIdContainer;
