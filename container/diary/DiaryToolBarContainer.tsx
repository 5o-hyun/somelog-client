import { getConnect } from '@lib/api/connect';
import { getPolaroids } from '@lib/api/diary';
import useToggle from '@lib/hooks/useToggle';

import { Connect } from '@typess/connect';
import { Polaroids } from '@typess/diary';

import DiaryMainToolbar from '@components/diary/DiaryMainToolbar';

import useAuthStore from '@/stores/auth';

import { message } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';

const DiaryToolBarContainer = () => {
  const { user } = useAuthStore();
  const [isOpenSwiperModal, toggleOpenSwiperModal] = useToggle();

  const { data: polaroids } = useQuery<Polaroids>(
    ['polaroids', user?.id],
    () => getPolaroids(user?.id as number),
    { enabled: !!user },
  );
  const { data: connect } = useQuery<Connect>(
    ['connect', user?.id],
    () => getConnect(user?.id as number),
    { enabled: !!user },
  );

  const onClickPlayButton = () => {
    if (!polaroids) {
      return;
    }
    if (polaroids.length > 0) {
      toggleOpenSwiperModal();
    } else {
      message.warning('글쓰기로 폴라로이드를 남겨주세요!');
    }
  };

  return (
    <DiaryMainToolbar
      polaroids={polaroids}
      startDate={connect?.startDate}
      isOpen={isOpenSwiperModal}
      toggleOpen={onClickPlayButton}
    />
  );
};

export default DiaryToolBarContainer;
