import { getMemos } from '@lib/api/memo';

import { Memos } from '@typess/memo';

import Title from '@components/base/Title';
import MemoGrid from '@components/memo/MemoGrid';
import MemoGridToolBar from '@components/memo/MemoGridToolBar';

import useAuthStore from '@/stores/auth';

import React from 'react';
import { useQuery } from 'react-query';

const MemoContainer = () => {
  const { user } = useAuthStore();
  const { data: memos } = useQuery<Memos>(['memos', user?.id], () =>
    getMemos(user?.id as number),
  );

  return (
    <>
      <Title name="메모장" />
      <MemoGridToolBar />
      <MemoGrid memos={memos} />
    </>
  );
};

export default MemoContainer;
