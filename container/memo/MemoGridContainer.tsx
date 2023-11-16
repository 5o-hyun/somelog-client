import { getMemos } from '@lib/api/memo';

import { Memos } from '@typess/memo';

import Title from '@components/base/Title';
import MemoGrid from '@components/memo/MemoGrid';
import MemoGridToolBar from '@components/memo/MemoGridToolBar';

import React from 'react';
import { useQuery } from 'react-query';

const MemoContainer = () => {
  const { data: memos } = useQuery<Memos>('memos', getMemos);

  return (
    <>
      <Title name="메모장" />
      <MemoGridToolBar />
      <MemoGrid memos={memos} />
    </>
  );
};

export default MemoContainer;
