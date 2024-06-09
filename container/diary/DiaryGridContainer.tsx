import { getConnect } from '@lib/api/connect';
import { getDiaries, getDiary } from '@lib/api/diary';
import useToggle from '@lib/hooks/useToggle';

import { Connect } from '@typess/connect';
import { Diaries } from '@typess/diary';

import DiaryDetailModal from '@components/diary/DiaryDetailModal';
import DiaryGrid from '@components/diary/DiaryGrid';

import useAuthStore from '@/stores/auth';

import React, { useEffect, useState } from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';
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
  const {
    data: diaryList,
    fetchNextPage, // 다음페이지호출함수
    hasNextPage, // 다음페이지 가지고있는지 t/f
    isFetchingNextPage, // 다음페이지 호풀중인지
    refetch: refetchDiaryList,
  } = useInfiniteQuery<Diaries>(
    ['diaries', user?.id],
    ({ pageParam = 1 }) => getDiaries(user?.id as number, pageParam, 5),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length < 5) return undefined;
        return pages.length + 1;
      },
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

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 100 >=
      document.documentElement.scrollHeight
    ) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasNextPage, isFetchingNextPage]);

  return (
    <>
      <Container>
        {diaryList?.pages.map((page) =>
          page.map((diary) => (
            <DiaryGrid
              key={diary.id}
              diary={diary}
              startDate={connect?.startDate}
              onClickDiary={onClickDiary}
            />
          )),
        )}
      </Container>
      {isOpenDetail && (
        <DiaryDetailModal
          userId={user?.id}
          diary={diary}
          startDate={connect?.startDate}
          onClose={toggleOpenDetail}
          refetch={refetchDiary}
          refetchDiaryList={refetchDiaryList}
        />
      )}
    </>
  );
};
const Container = styled.div`
  padding-bottom: 60px;
`;

export default DiaryGridContainer;
