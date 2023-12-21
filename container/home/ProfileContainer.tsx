import { updateUser } from '@lib/api/user';
import useToggle from '@lib/hooks/useToggle';

import NoNavigationLayout from '@components/base/NoNavigationLayout';
import Title from '@components/base/Title';
import ProfileToolbar from '@components/home/profile/ProfileToolbar';
import UserDangerZone from '@components/home/profile/UserDangerZone';
import UserInfo from '@components/home/profile/UserInfo';
import UserInfoPhotoMethod from '@components/home/profile/UserInfoPhotoMethod';

import useAuthStore from '@/stores/auth';

import { message } from 'antd';
import AWS from 'aws-sdk';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';

const ProfileContainer = () => {
  const { user } = useAuthStore();
  const [isOpenPhotoMethod, toggleOpenPhotoMethod] = useToggle();
  const [userInfo, setUserInfo] = useState<{
    id: number | null;
    photo: string | null;
    nickname: string;
    birthday: string;
    sex: string;
  }>({
    id: null,
    photo: null,
    nickname: '',
    birthday: '',
    sex: '',
  });

  // 유저정보로딩
  useEffect(() => {
    if (user) {
      setUserInfo({
        id: user.id,
        photo: user.photo,
        nickname: user.nickname,
        birthday: user.birthday,
        sex: user.sex,
      });
    }
  }, [user]);

  // 유저정보바꾸기
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
    if (imageFile) {
      s3Upload(imageFile);
    }
    updateUserInfo.mutate(userInfo as any);
  };
  const onClickPhoto = () => {
    toggleOpenPhotoMethod();
  };

  // 프로필이미지 미리보기
  const [imageFile, setImageFile] = useState();
  const [imageSrc, setImageSrc]: any = useState(null);

  const handleUpload = (e: any) => {
    const file = e.fileList[0].originFileObj;
    // 1) 파일리더기로 업로드한 파일객체를 readAsDataURL로 파일객체를 읽어옴
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise<void>((resolve) => {
      // 2) imageSrc에 파일의 콘텐츠를 저장하고,
      reader.onload = () => {
        setImageSrc(reader.result || null);
        resolve();
      };
      // 3) 유저정보에 imageSrc부여 ======> 미리보기끝
      setUserInfo((prev) => ({
        ...prev,
        ['photo']: imageSrc,
      }));
      // 4) 이미지파일 넣어주기
      const fileFormat = file.name.split('.').reverse()[0];
      setUserInfo((prev) => ({
        ...prev,
        ['photo']: 'users/' + user?.id + '.' + fileFormat,
      }));
      setImageFile(file);
      toggleOpenPhotoMethod();
    });
  };

  // 프로필이미지 업로드
  AWS.config.update({
    region: 'ap-northeast-2',
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
  });

  const s3Upload = async (file: File) => {
    const fileFormat = file.name.split('.').reverse()[0];
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: 'somelogimg', // 버킷이름
        Key: 'users/' + user?.id + '.' + fileFormat, // 경로와이름설정
        Body: file, // 파일객체
        ContentType: file.type,
      },
    });
    const promise = upload.promise();
    promise.then(
      function () {
        window.setTimeout(function () {
          console.log('업로드');
        }, 2000);
      },
      function (err) {
        console.log('에러', err);
      },
    );
  };
  // 프로필 기본이미지로 변경
  const onRemoveUpload = () => {
    setUserInfo((prev) => ({
      ...prev,
      ['photo']: null,
    }));
    toggleOpenPhotoMethod();
  };

  return (
    <NoNavigationLayout>
      <Title name="프로필" />
      <ProfileToolbar onClick={onSave} />
      <UserInfo
        user={userInfo}
        imageSrc={imageSrc}
        onClick={onClickPhoto}
        onChange={onChangeUserInfo}
      />
      {isOpenPhotoMethod && (
        <UserInfoPhotoMethod
          onChange={handleUpload}
          onRemove={onRemoveUpload}
          onClose={toggleOpenPhotoMethod}
        />
      )}
      <UserDangerZone />
    </NoNavigationLayout>
  );
};

export default ProfileContainer;
