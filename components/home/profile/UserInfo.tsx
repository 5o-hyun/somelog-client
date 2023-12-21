import { UserOutlined } from '@ant-design/icons';

import { Avatar, DatePicker, Input, Select } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import styled from 'styled-components';

interface UserInfoProps {
  user: {
    photo: string | null;
    nickname: string;
    birthday: string;
    sex: string;
  };
  imageSrc: any;
  onClick: () => void;
  onChange: (key: string, value: any) => void;
}

const UserInfo: React.FC<UserInfoProps> = ({
  user,
  imageSrc,
  onClick,
  onChange,
}) => {
  return (
    <Container>
      <div className="userPhoto" onClick={onClick}>
        {imageSrc ? (
          <img src={imageSrc} alt="미리보기" />
        ) : user.photo ? (
          <img
            src={`${process.env.NEXT_PUBLIC_S3URL}${user.photo}`}
            alt="유저프로필이미지"
          />
        ) : (
          <Avatar className="userPhotoNo" icon={<UserOutlined />} />
        )}
      </div>
      <Input
        value={user.nickname}
        onChange={(e) => onChange('nickname', e.target.value)}
        className="userName"
        placeholder="이름을 입력해주세요"
      />
      <div className="infoWrapper">
        <p className="infoTitle">생일</p>
        <DatePicker
          value={dayjs(user.birthday)}
          onChange={(date) =>
            onChange('birthday', dayjs(date).format('YYYY-MM-DD'))
          }
          className="infoContent"
        />
      </div>
      <div className="infoWrapper">
        <p className="infoTitle">성별</p>
        <Select
          value={user.sex}
          options={[
            { value: 'M', label: '남자' },
            { value: 'W', label: '여자' },
          ]}
          onChange={(e) => onChange('sex', e)}
          className="infoContent"
        />
      </div>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .userPhoto {
    width: 140px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    margin-bottom: 20px;
    overflow: hidden;
    border: 1px solid ${({ theme }) => theme.colors.gray[200]};
    cursor: pointer;
    .userPhotoNo {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .anticon {
        width: 40%;
        height: 40%;
        svg {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .userName {
    width: 200px;
    margin-bottom: 40px;
  }
  .infoWrapper {
    width: 200px;
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    .infoTitle {
      min-width: 50px;
    }
    .infoContent {
      width: 100%;
    }
  }
`;

export default UserInfo;
