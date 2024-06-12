import { getConnect } from '@lib/api/connect';
import { getPolaroids } from '@lib/api/diary';
import useToggle from '@lib/hooks/useToggle';

import { Connect } from '@typess/connect';
import { Polaroids } from '@typess/diary';

import DiaryMainToolbar from '@components/diary/DiaryMainToolbar';

import useAuthStore from '@/stores/auth';

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

  return (
    <DiaryMainToolbar
      polaroids={polaroids}
      startDate={connect?.startDate}
      isOpen={isOpenSwiperModal}
      toggleOpen={toggleOpenSwiperModal}
    />
  );
};

export default DiaryToolBarContainer;
