import { deleteCelebration, getCelebrationList } from '@lib/api/schedule';

import Title from '@components/base/Title';
import Celebration from '@components/home/celebration/Celebration';
import CelebrationToolbar from '@components/home/celebration/CelebrationToolbar';

import useAuthStore from '@/stores/auth';

import { message } from 'antd';
import React from 'react';
import { useMutation, useQuery } from 'react-query';

const CelebrationContainer = () => {
  const { user } = useAuthStore();
  const { data: celebrations, refetch: refetchCelebrations } = useQuery(
    ['celebrations', user?.id],
    () => getCelebrationList(user?.id as number),
    { enabled: !!user },
  );

  const deleteCelebrationMutation = useMutation(deleteCelebration, {
    onSuccess: () => {
      message.success('기념일을 해제했습니다.');
      refetchCelebrations();
    },
    onError: (err: any) => {
      err.response.data
        ? message.error(err.response.data)
        : message.error('기념일을 해제할수없습니다.');
    },
  });

  const onDelete = (id: number) => {
    deleteCelebrationMutation.mutate(id);
  };

  return (
    <>
      <Title name="기념일관리" />
      <CelebrationToolbar />
      <Celebration lists={celebrations} onDelete={onDelete} />
    </>
  );
};

export default CelebrationContainer;
