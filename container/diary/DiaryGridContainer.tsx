import { getConnect } from '@lib/api/connect';
import { getDiaries, getDiary } from '@lib/api/diary';
import useToggle from '@lib/hooks/useToggle';

import { Connect } from '@typess/connect';
import { Diaries } from '@typess/diary';

import DiaryDetailModal from '@components/diary/DiaryDetailModal';
import DiaryGrid from '@components/diary/DiaryGrid';

import useAuthStore from '@/stores/auth';

import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

const DiaryGridContainer = () => {
  const { user } = useAuthStore();
  const [diaryId, setDiaryId] = useState(0);
  const [isOpenDetail, toggleOpenDetail] = useToggle();

  const { data: connect } = useQuery<Connect>(
    ['connect', user?.id],
    () => getConnect(user?.id as number),
    { enabled: !!user },
  );
  const { data: diaryList, refetch: refetchDiaryList } = useQuery<Diaries>(
    ['diaries', user?.id],
    () => getDiaries(user?.id),
    {
      enabled: !!user,
    },
  );
  const { data: diary, refetch: refetchDiary } = useQuery(
    ['diary', diaryId],
    () => getDiary(diaryId),
    {
      enabled: diaryId != 0,
    },
  );

  const onClickDiary = (id: number) => {
    setDiaryId(id);
    toggleOpenDetail();
  };

  return (
    <>
      <Container>
        {diaryList?.map((diary) => (
          <DiaryGrid
            key={diary.id}
            diary={diary}
            startDate={connect?.startDate}
            onClickDiary={onClickDiary}
          />
        ))}
      </Container>
      {isOpenDetail && (
        <DiaryDetailModal
          userId={user?.id}
          diary={diary}
          startDate={connect?.startDate}
          onClose={toggleOpenDetail}
          refetch={refetchDiary}
          refetchList={refetchDiaryList}
        />
      )}
    </>
  );
};
const Container = styled.div`
  padding-bottom: 60px;
`;

export default DiaryGridContainer;
