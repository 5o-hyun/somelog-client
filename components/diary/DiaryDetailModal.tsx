import { createComment, deleteComment, updateComment } from '@lib/api/diary';
import useToggle from '@lib/hooks/useToggle';

import { Diary } from '@typess/diary';

import Button from '@components/base/Button';

import { DeleteOutlined } from '@ant-design/icons';

import DiaryBigPhotoModal from './DiaryBigPhotoModal';
import { Empty, Input, Modal, Popconfirm, message } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa6';
import { useMutation } from 'react-query';
import styled from 'styled-components';

interface DiaryDetailModalProps {
  userId?: number;
  diary: Diary;
  startDate?: string; // 커플시작일
  onClose: () => void;
  refetch: () => void;
  refetchList: () => void;
}

const DiaryDetailModal: React.FC<DiaryDetailModalProps> = ({
  userId,
  diary,
  startDate,
  onClose,
  refetch,
  refetchList,
}) => {
  const [imagePath, setImagePath] = useState('');
  const [writeDay, setWriteDay] = useState<string>(); // 작성일
  const [today, setToday] = useState(new Date()); // 오늘
  const [comment, setComment] = useState('');
  const [isOpenBigPhoto, toggleOpenBigPhoto] = useToggle();

  // 디데이계산
  useEffect(() => {
    if (!diary) {
      return;
    }
    setWriteDay(diary.date);
    setDiaryComments(diary.DiaryComments);
  }, [diary]);
  const calculate = Math.floor(
    (today.getTime() - new Date(String(writeDay)).getTime()) /
      (1000 * 3600 * 24),
  );

  const onClickImage = (path: string) => {
    setImagePath(path);
    toggleOpenBigPhoto();
  };

  // 댓글 작성
  const createCommentMutation = useMutation(createComment, {
    onSuccess: () => {
      message.success('댓글을 작성했습니다.');
      refetch();
      refetchList();
      setComment('');
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

  // 댓글 수정
  const [diaryComments, setDiaryComments] = useState(diary?.DiaryComments);
  const [editActiveIndex, setEditActiveIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const onEditMode = (comment: any) => {
    if (comment.UserId !== userId) {
      setEditMode(false);
      return;
    }
    diaryComments.map((v) => {
      if (v.id === comment.id) {
        setEditActiveIndex(comment.id);
        setEditMode((prev) => !prev);
        setTempComment(comment.comment);
      }
    });
  };

  const [tempComment, setTempComment] = useState('');
  const updateCommentMutation = useMutation(updateComment, {
    onSuccess: () => {
      message.success('댓글을 수정했습니다.');
      setEditMode(false);
      refetch();
    },
    onError: (err: any) => {
      err.response.data
        ? message.error(err.response.data)
        : message.error('댓글을 수정할수없습니다.');
    },
  });

  const onChangeUpdateComment = (e: any) => {
    setTempComment(e.target.value);
  };

  const onUpdateComment = (commentId: number) => {
    updateCommentMutation.mutate({
      diaryId: diary.id,
      userId: userId,
      commentId: commentId,
      comment: tempComment,
    });
  };

  const deleteCommentMutation = useMutation(deleteComment, {
    onSuccess: () => {
      message.success('댓글을 삭제했습니다.');
      refetch();
      refetchList();
    },
    onError: (err: any) => {
      err.response.data
        ? message.error(err.response.data)
        : message.error('댓글을 삭제할수없습니다.');
    },
  });
  const onDeleteComment = (commentId: number) => {
    deleteCommentMutation.mutate({ diaryId: diary?.id, commentId: commentId });
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
            댓글 <b>{diary?.DiaryComments.length}</b>
          </p>
          <div className="commentCreateForm">
            <Input
              value={comment}
              onChange={(e: any) => onChangeComment(e.target.value)}
              placeholder="댓글을 남겨보세요."
            />
            <button onClick={onSave}>작성</button>
          </div>
          {diary?.DiaryComments.map((comment) => (
            <>
              <div
                key={comment.id}
                className={
                  editMode && editActiveIndex === comment.id
                    ? 'comment active'
                    : 'comment'
                }
                onClick={() => onEditMode(comment)}
              >
                <div className="left">
                  <div className="profile">
                    <img
                      src={`${process.env.NEXT_PUBLIC_S3URL}${comment.User.photo}`}
                    />
                  </div>
                  <p className="commentDetail">{comment.comment}</p>
                </div>
                <div className="right">
                  <p className="time">
                    {dayjs(comment.updatedAt).format('YYYY.MM.DD Ahh:mm')}
                  </p>
                </div>
              </div>
              <div
                className={
                  editMode && editActiveIndex === comment.id
                    ? 'editContents active'
                    : 'editContents'
                }
              >
                <Input
                  value={tempComment}
                  onChange={(e: any) => onChangeUpdateComment(e)}
                />
                <div className="buttonG">
                  <Popconfirm
                    title="수정하시겠습니까?"
                    onConfirm={() => onUpdateComment(comment.id)}
                    okText="수정"
                    cancelText="취소"
                  >
                    <Button icon={<FaPen />} />
                  </Popconfirm>
                  <Popconfirm
                    title="삭제하시겠습니까?"
                    onConfirm={() => onDeleteComment(comment.id)}
                    okText="삭제"
                    cancelText="취소"
                  >
                    <Button icon={<DeleteOutlined />} />
                  </Popconfirm>
                </div>
              </div>
            </>
          ))}
        </div>
        {diary?.DiaryComments.length === 0 && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="아직 댓글이 없어요:("
          />
        )}
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
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      &.active {
        background-color: rgba(0, 0, 0, 0.03);
      }
      .left {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
        .profile {
          display: block;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          overflow: hidden;
          @media ${({ theme }) => theme.devices.mobile} {
            width: 26px;
            height: 26px;
          }
        }
        .commentDetail {
          flex: 1;
        }
      }
      .right {
        .time {
          width: max-content;
          color: ${({ theme }) => theme.colors.gray[500]};
          @media ${({ theme }) => theme.devices.mobile} {
            font-size: 12px;
          }
        }
      }
    }
    .editContents {
      display: none;
      gap: 4px;
      margin-bottom: 8px;
      &.active {
        display: flex;
      }
      .buttonG {
        display: flex;
        gap: 4px;
        button {
          width: max-content;
          height: 32px;
          svg {
            margin-right: -2px;
          }
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
