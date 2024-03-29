import { getConnect } from '@lib/api/connect';
import { createDiary } from '@lib/api/diary';
import useToggle from '@lib/hooks/useToggle';

import { Connect } from '@typess/connect';

import Title from '@components/base/Title';
import DiaryCreateToolbar from '@components/diary/DiaryCreateToolbar';

import useAuthStore from '@/stores/auth';
import { PlusOutlined } from '@ant-design/icons';

import {
  Card,
  DatePicker,
  Input,
  Modal,
  Upload,
  UploadFile,
  message,
} from 'antd';
import { RcFile } from 'antd/es/upload';
import AWS from 'aws-sdk';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import shortid from 'shortid';
import styled from 'styled-components';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const DiaryCreateContainer = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const { data: connect } = useQuery<Connect>(
    ['connect', user?.id],
    () => getConnect(user?.id as number),
    { enabled: !!user },
  );
  const [info, setInfo] = useState<{
    date: string;
    title: string;
    userId?: number;
  }>({
    date: dayjs().format('YYYY-MM-DD'),
    title: '',
    userId: user?.id,
  });

  const onChangeInfo = (key: string, value: any) => {
    setInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
    if (key === 'date') {
      setWriteDay(new Date(value));
    }
  };

  // 디데이계산
  const [startDay, setStartDay] = useState<string>();
  const [writeDay, setWriteDay] = useState(new Date());
  useEffect(() => {
    if (!connect) {
      return;
    }
    setStartDay(connect.startDate);
  }, [connect]);

  const calculate = Math.floor(
    (writeDay.getTime() - new Date(String(startDay)).getTime()) /
      (1000 * 3600 * 24),
  );

  // <-- 이미지 업로드 시작
  const [isOpenPreview, toggleOpenPreview] = useToggle();
  const [previewImage, setPreviewImage] = useState('');
  const [files, setFiles] = useState<any>([]);

  const onChangeUpload = (e: any) => {
    s3Upload(e.file.originFileObj);
  };

  AWS.config.update({
    region: 'ap-northeast-2',
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
  });
  const s3 = new AWS.S3();

  const s3Upload = async (file: File) => {
    if (!file) return;

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: 'somelogimg', // 버킷이름
        Key: 'diaryImages/' + dayjs().format('YYYYMMDD-HHmm') + file.name, // 경로와이름설정
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
            }diaryImages/${dayjs().format('YYYYMMDD-HHmm')}${file.name}`,
          },
        ]);
      },
      function (err) {
        console.log('에러', err);
      },
    );
  };

  const onDelete = (item: any) => {
    const fileList = files.filter((file: any) => file !== item);
    setFiles(fileList);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    toggleOpenPreview();
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  // 이미지 업로드 끝 -->

  const createDiaryMutation = useMutation(createDiary, {
    onSuccess: () => {
      message.success('다이어리를 작성했습니다.');
      router.push('/diary');
    },
    onError: () => {
      message.error('다이어리를 작성할수없습니다.');
    },
  });

  const onSave = () => {
    if (files.length === 0) {
      return message.error('폴라로이드는 사진을 1개이상 업로드 해야합니다.');
    }
    createDiaryMutation.mutate({
      date: info.date,
      title: info.title,
      userId: info.userId,
      files: files,
    });
  };

  return (
    <Container>
      <Title name="글쓰기" />
      <DiaryCreateToolbar onSave={onSave} />
      <Card>
        <div className="top">
          <div className="left">
            <p className="dateCalculate">
              {calculate === 0 ? '첫 만난날' : `${calculate}일`}
            </p>
            <DatePicker
              defaultValue={dayjs()}
              onChange={(date) =>
                onChangeInfo('date', dayjs(date).format('YYYY-MM-DD'))
              }
            />
          </div>
          <div className="right">
            <Input
              placeholder="폴라로이드 제목"
              onChange={(e) => onChangeInfo('title', e.target.value)}
            />
          </div>
        </div>
        <div className="photoWrapper">
          <Upload
            listType="picture-card"
            fileList={files}
            multiple
            onPreview={handlePreview}
            onChange={(e) => onChangeUpload(e)}
            onRemove={(item) => onDelete(item)}
          >
            {files?.length > 5 ? null : uploadButton}
          </Upload>
          <Modal
            open={isOpenPreview}
            title="이미지 미리보기"
            footer={null}
            onCancel={toggleOpenPreview}
          >
            <img
              style={{ width: '100%' }}
              src={previewImage}
              alt="이미지 미리보기"
            />
          </Modal>
        </div>
      </Card>
    </Container>
  );
};
const Container = styled.div`
  .top {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 20px;
    .left {
      .dateCalculate {
        font-size: 20px;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.textColor};
      }
    }
  }
  .photoWrapper {
  }
`;

export default DiaryCreateContainer;
