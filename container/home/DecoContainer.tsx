import {
  createImageConnect,
  getConnect,
  getImageConnect,
  updateConnect,
} from '@lib/api/connect';

import { Connect } from '@typess/connect';

import Title from '@components/base/Title';
import DecoDisplay from '@components/home/deco/DecoDisplay';
import ImageDisplay from '@components/home/deco/ImageDisplay';
import ProfileToolbar from '@components/home/profile/ProfileToolbar';

import useAuthStore from '@/stores/auth';

import { message } from 'antd';
import AWS from 'aws-sdk';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import shortid from 'shortid';

const DecoContainer = () => {
  const { user } = useAuthStore();
  const { data: connect } = useQuery<Connect>(
    ['connect', user?.id],
    () => getConnect(user?.id as number),
    { enabled: !!user },
  );

  const { data: backgroundImages } = useQuery(
    ['backgroundImages', connect?.id],
    () => getImageConnect(connect?.id as number),
    { enabled: !!connect },
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
    createUploadImage.mutate({
      connectId: connect?.id,
      images: files,
    });
  };

  // 이미지 업로드
  AWS.config.update({
    region: 'ap-northeast-2',
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
  });
  const s3 = new AWS.S3();

  const [files, setFiles] = useState<any>([]);

  console.log(files);

  useEffect(() => {
    if (!backgroundImages) {
      return;
    }
    setFiles(
      backgroundImages.map((backgroundImage: any) => ({
        uid: backgroundImage.id,
        name: 'image.png',
        status: 'done',
        // url: `${process.env.NEXT_PUBLIC_S3URL}${backgroundImage.imagePath}`,
        url: `${backgroundImage.imagePath}`,
      })),
    );
  }, [backgroundImages]);

  const onChangeFile = (e: any) => {
    s3Upload(e.file.originFileObj);
  };

  const s3Upload = async (file: File) => {
    if (!file) return;

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: 'somelogimg', // 버킷이름
        Key:
          'connectBackgroundImg/' + dayjs().format('YYYYMMDD-HHmm') + file.name, // 경로와이름설정
        Body: file, // 파일객체
        ContentType: file.type,
      },
    });
    const promise = upload.promise();
    promise.then(
      function () {
        setFiles([
          ...files,
          {
            uid: shortid(),
            name: 'image.png',
            status: 'done',
            url: `${
              process.env.NEXT_PUBLIC_S3URL
            }connectBackgroundImg/${dayjs().format('YYYYMMDD-HHmm')}${
              file.name
            }`,
          },
        ]);
      },
      function (err) {
        console.log('에러', err);
      },
    );
  };

  const onDeleteFile = (item: any) => {
    const fileList = files.filter((file: any) => file !== item);
    setFiles(fileList);
  };

  const createUploadImage = useMutation(createImageConnect, {
    onSuccess: () => {
      console.log('이미지 등록완료');
    },
    onError: () => {
      console.error('이미지를 등록할수없습니다.');
    },
  });

  return (
    <>
      <Title name="홈 꾸미기" />
      <ProfileToolbar onClick={onSave} />
      <DecoDisplay
        widget={widget}
        isChecked={onChangeCheck}
        onChange={onChangeStartDate}
      />
      <ImageDisplay
        files={files}
        onChange={onChangeFile}
        onDelete={onDeleteFile}
      />
    </>
  );
};

export default DecoContainer;
