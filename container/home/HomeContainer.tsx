import { getColorList } from '@lib/api/color';
import { getConnect, getImageConnect } from '@lib/api/connect';
import { getMemos } from '@lib/api/memo';
import { updateUser } from '@lib/api/user';
import useToggle from '@lib/hooks/useToggle';

import { Colors } from '@typess/color';
import { Connect } from '@typess/connect';
import { Memos } from '@typess/memo';

import Anniversary from '@components/home/Anniversary';
import FloatButtons from '@components/home/FloatButtons';
import MemoList from '@components/home/MemoList';
import MoodModal from '@components/home/MoodModal';
import PhotoSlider from '@components/home/PhotoSlider';
import Profile from '@components/home/Profile';

import useAuthStore from '@/stores/auth';

import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import styled from 'styled-components';

const HomeContainer = () => {
  const { user } = useAuthStore();

  const { data: connect } = useQuery<Connect>(
    ['connect', user?.id],
    () => getConnect(user?.id as number),
    { enabled: !!user },
  );

  const { data: memos } = useQuery<Memos>(
    ['memos', user?.id],
    () => getMemos(user?.id as number),
    { enabled: !!user },
  );

  const { data: images } = useQuery(
    ['images', connect?.id],
    () => getImageConnect(connect?.id as number),
    { enabled: !!connect },
  );

  const { data: colors } = useQuery<Colors>('colors', getColorList);

  const [isOpenMoodModal, toggleOpenMoodModal] = useToggle();

  const [moodInfo, setMoodInfo] = useState<{
    id?: number;
    moodEmoji?: string | null;
    moodColor?: string | null;
  }>({
    id: undefined,
    moodEmoji: null,
    moodColor: null,
  });

  useEffect(() => {
    setMoodInfo({
      id: user?.id,
      moodEmoji: user?.moodEmoji,
      moodColor: user?.moodColor,
    });
  }, [user]);

  const onChange = (key: string, value: any) => {
    setMoodInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const queryClient = useQueryClient(); // 전역 refetch

  const updateUserInfo = useMutation(updateUser, {
    onSuccess: () => {
      message.success('프로필이 수정되었습니다.');
      toggleOpenMoodModal();
      queryClient.invalidateQueries(['user']); // 전역 refetch
    },
    onError: (err: any) => {
      err.response.data
        ? message.error(err.response.data)
        : message.error('프로필을 수정할수없습니다.');
    },
  });

  const onSave = () => {
    updateUserInfo.mutate(moodInfo as any);
  };

  return (
    <Container>
      <PhotoSlider connect={connect} images={images} />
      {connect?.DdayStatus === 'Y' && <Anniversary />}
      {connect?.feelStatus === 'Y' && (
        <Profile toggleOpenMoodModal={toggleOpenMoodModal} />
      )}
      <div className="border" />
      {connect?.memoStatus === 'Y' && <MemoList memos={memos} />}
      {isOpenMoodModal && (
        <MoodModal
          colors={colors}
          onChange={onChange}
          onSave={onSave}
          onClose={toggleOpenMoodModal}
        />
      )}
      <FloatButtons />
    </Container>
  );
};

const Container = styled.div`
  .border {
    width: 100%;
    height: 1px;
    border: 1px dashed ${({ theme }) => theme.colors.gray[200]};
    margin-bottom: 20px;
  }
`;

export default HomeContainer;
