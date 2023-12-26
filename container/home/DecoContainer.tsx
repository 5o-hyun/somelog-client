import { getConnect, updateConnect } from '@lib/api/connect';

import { Connect } from '@typess/connect';

import Title from '@components/base/Title';
import DecoDisplay from '@components/home/deco/DecoDisplay';
import ProfileToolbar from '@components/home/profile/ProfileToolbar';

import useAuthStore from '@/stores/auth';

import { message } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';

const DecoContainer = () => {
  const { user } = useAuthStore();
  const { data: connect } = useQuery<Connect>(['connect', user?.id], () =>
    getConnect(user?.id as number),
  );
  const [widget, setWidget] = useState<{
    id?: number;
    status: string;
    startDate?: string;
    postitStatus: string;
    sliderStatus: string;
    feelStatus: string;
    memoStatus: string;
    DdayStatus: string;
  }>({
    id: undefined,
    status: 'Y',
    startDate: undefined, // 기본값 어떻게 할지 생각해보기
    postitStatus: 'Y',
    sliderStatus: 'Y',
    feelStatus: 'Y',
    memoStatus: 'Y',
    DdayStatus: 'Y',
  });

  useEffect(() => {
    if (connect) {
      setWidget({
        id: connect.id,
        status: connect.status,
        startDate: connect.startDate,
        postitStatus: connect.postitStatus,
        sliderStatus: connect.sliderStatus,
        feelStatus: connect.feelStatus,
        memoStatus: connect.memoStatus,
        DdayStatus: connect.DdayStatus,
      });
    }
  }, [connect]);

  const onChangeCheck = (e: any, key: string) => {
    setWidget((prev) => ({
      ...prev,
      [key]: e.target.checked ? 'Y' : 'N',
    }));
  };
  const onChangeStartDate = (date: Dayjs | null) => {
    setWidget((prev) => ({
      ...prev,
      startDate: dayjs(date).format('YYYY-MM-DD'),
    }));
  };

  const updateConnectInfo = useMutation(updateConnect, {
    onSuccess: () => {
      message.success('연결된 정보를 수정했습니다.');
    },
    onError: (err: any) => {
      err.response.data
        ? message.error(err.response.data)
        : message.error('연결된 정보를 수정할수없습니다.');
    },
  });

  const onSave = () => {
    updateConnectInfo.mutate(widget as any);
  };

  return (
    <>
      <Title name="홈 꾸미기" />
      <ProfileToolbar onClick={onSave} />
      <DecoDisplay
        widget={widget}
        isChecked={onChangeCheck}
        onChange={onChangeStartDate}
      />
    </>
  );
};

export default DecoContainer;
