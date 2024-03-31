import { getDiaries } from '@lib/api/diary';

import { Diaries } from '@typess/diary';

import DiaryGrid from '@components/diary/DiaryGrid';

import useAuthStore from '@/stores/auth';

import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

const DiaryGridContainer = () => {
  const { user } = useAuthStore();
  const { data: diaryList } = useQuery<Diaries>(
    ['diaries', user?.id],
    () => getDiaries(user?.id),
    {
      enabled: !!user,
    },
  );

  return (
    <Container>
      {diaryList?.map((diary) => <DiaryGrid key={diary.id} diary={diary} />)}
    </Container>
  );
};
const Container = styled.div`
  padding-bottom: 60px;
`;

export default DiaryGridContainer;
