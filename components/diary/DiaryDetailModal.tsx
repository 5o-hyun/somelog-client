import { createComment } from '@lib/api/diary';
import useToggle from '@lib/hooks/useToggle';

import DiaryBigPhotoModal from './DiaryBigPhotoModal';
import { Input, Modal, message } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';

interface DiaryDetailModalProps {
  userId?: number;
  diary: any;
  startDate?: string; // 커플시작일
  onClose: () => void;
}

const DiaryDetailModal: React.FC<DiaryDetailModalProps> = ({
  userId,
  diary,
  startDate,
  onClose,
}) => {
  const [imagePath, setImagePath] = useState('');
  const [writeDay, setWriteDay] = useState<string>(); // 작성일
  const [today, setToday] = useState(new Date()); // 오늘
  const [comment, setComment] = useState();
  const [isOpenBigPhoto, toggleOpenBigPhoto] = useToggle();

  // 디데이계산
  useEffect(() => {
    if (!diary) {
      return;
    }
    setWriteDay(diary.date);
  }, [diary]);
  const calculate = Math.floor(
    (today.getTime() - new Date(String(writeDay)).getTime()) /
      (1000 * 3600 * 24),
  );

  const onClickImage = (path: string) => {
    setImagePath(path);
    toggleOpenBigPhoto();
  };

  // 댓글
  const createCommentMutation = useMutation(createComment, {
    onSuccess: () => {
      message.success('댓글을 작성했습니다.');
    },
    onError: (err: any) => {
      err.response.data
        ? message.error(err.response.data)
        : message.error('프로필을 수정할수없습니다.');
    },
  });

  const onChangeComment = (e: any) => {
    setComment(e);
  };

  const onSave = () => {
    if (!userId) {
      return message.error('존재하지않는 유저입니다.');
    }
    if (!comment) {
      return message.error('댓글을 작성해주세요.');
    }

    createCommentMutation.mutate({
      diaryId: diary.id,
      userId: userId,
      comment: comment,
    });
  };

  return (
    <>
      <StyledModal
        open
        onCancel={onClose}
        // onOk={onOk}
        okText="삭제"
      >
        <div className="top">
          <div className="left">
            <p className="calculate">
              {dayjs(writeDay).format('YYYY-MM-DD') === startDate
                ? '첫 만난날'
                : calculate === 0
                  ? '오늘'
                  : `${calculate}일`}
            </p>
            <p className="date">
              {dayjs(diary?.date).format('YYYY.MM.DD(ddd)')}
            </p>
          </div>
          <p className="subject">{diary?.title}</p>
        </div>
        <div className="photoWrapper">
          {diary?.DiaryImages.map((v: any) => (
            <div
              key={v.id}
              className="photo"
              onClick={() => onClickImage(v.imagePath)}
            >
              <img src={v.imagePath} alt="이미지" />
            </div>
          ))}
        </div>
        <div className="commentWrapper">
          <p className="commentTitle">
            댓글 <b>0</b>
          </p>
          <div className="commentCreateForm">
            <Input
              onChange={(e: any) => onChangeComment(e.target.value)}
              placeholder="댓글을 남겨보세요."
            />
            <button onClick={onSave}>작성</button>
          </div>
          <div className="comment">
            <div className="profile">
              <img src="https://via.placeholder.com/640x480" />
            </div>
            <p className="commentDetail">comment</p>
          </div>
          <div className="comment">
            <div className="profile">
              <img src="https://via.placeholder.com/640x480" />
            </div>
            <p className="commentDetail">comment</p>
          </div>
        </div>
      </StyledModal>
      {isOpenBigPhoto && (
        <DiaryBigPhotoModal
          imagePath={imagePath}
          onClose={toggleOpenBigPhoto}
        />
      )}
    </>
  );
};

const StyledModal = styled(Modal)`
  .top {
    margin-top: 26px;
    display: flex;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 8px;
    .left {
      .calculate {
        font-size: 20px;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.textColor};
      }
      .date {
        color: #aaa;
      }
    }
    .subject {
      color: ${({ theme }) => theme.colors.textColor};
      font-size: 16px;
    }
  }
  .photoWrapper {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
    .photo {
      flex: 1;
      max-width: 100px;
      aspect-ratio: 1/1;
      border-radius: 10px;
      overflow: hidden;
      cursor: pointer;
    }
  }
  .commentCreateForm {
    display: flex;
    gap: 8px;
    margin-bottom: 8px;
    button {
      background-color: ${({ theme }) => theme.colors.primaryColor};
      color: ${({ theme }) => theme.colors.white};
      width: 50px;
      border-radius: 6px;
    }
  }
  .commentWrapper {
    .commentTitle {
      b {
        font-size: 16px;
        font-weight: bold;
      }
    }
    .comment {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      .profile {
        width: 36px;
        aspect-ratio: 1/1;
        border-radius: 50%;
        overflow: hidden;
        @media ${({ theme }) => theme.devices.mobile} {
          width: 26px;
        }
      }
    }
  }
  .ant-modal-footer {
    .ant-btn-default {
      display: none;
    }
  }
`;

export default DiaryDetailModal;
