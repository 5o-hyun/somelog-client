import { updateUser } from '@lib/api/user';

import NoNavigationLayout from '@components/base/NoNavigationLayout';
import Title from '@components/base/Title';
import ProfileToolbar from '@components/home/profile/ProfileToolbar';
import UserInfo from '@components/home/profile/UserInfo';

import useAuthStore from '@/stores/auth';

import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';

const ProfileContainer = () => {
  const { user } = useAuthStore();
  const [userInfo, setUserInfo] = useState<{
    id: number | null;
    photo?: string;
    nickname: string;
    birthday: string;
    sex: string;
  }>({
    id: null,
    photo: undefined,
    nickname: '',
    birthday: '',
    sex: '',
  });

  // 유저정보로딩
  useEffect(() => {
    if (user) {
      setUserInfo({
        id: user.id,
        photo: user?.photo,
        nickname: user.nickname,
        birthday: user.birthday,
        sex: user.sex,
      });
    }
  }, [user]);

  // 유저정보바꾸기
  // 1. 유저정보
  const onChangeUserInfo = (key: string, value: any) => {
    setUserInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const updateUserInfo = useMutation(updateUser, {
    onSuccess: () => {
      message.success('프로필이 수정되었습니다.');
    },
    onError: (err: any) => {
      err.response.data
        ? message.error(err.response.data)
        : message.error('프로필을 수정할수없습니다.');
    },
  });
  const onSave = () => {
    updateUserInfo.mutate(userInfo as any);
  };
  // 2. 유저정보 - 사진
  const onClickPhoto = () => {
    console.log('사진변경');
  };

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return (
    <NoNavigationLayout>
      <Title name="프로필" />
      <ProfileToolbar onClick={onSave} />
      <UserInfo
        user={userInfo}
        onClick={onClickPhoto}
        onChange={onChangeUserInfo}
      />
    </NoNavigationLayout>
  );
};

export default ProfileContainer;
