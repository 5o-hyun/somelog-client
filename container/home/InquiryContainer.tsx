import Title from '@components/base/Title';
import InquiryMethod from '@components/home/inquiry/InquiryMethod';
import InquiryToolbar from '@components/home/inquiry/InquiryToolbar';

import { message } from 'antd';
import React from 'react';
import { BsTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { RiKakaoTalkFill } from 'react-icons/ri';

const InquiryContainer = () => {
  const onClickMethod = (method: string, contents: string) => {
    window.location.href = `${method}:${contents}`;
  };

  return (
    <>
      <Title name="문의하기" />
      <InquiryToolbar />
      <InquiryMethod
        icon={<RiKakaoTalkFill />}
        title="카카오톡상담하기"
        desc="담당자와 1:1 카카오톡상담이 가능합니다."
        onClick={() =>
          message.warning('아직 카카오톡채널이 개설되지않았습니다.')
        }
      />
      <InquiryMethod
        icon={<MdEmail />}
        title="이메일상담하기"
        desc="담당자에게 메일을 보냅니다."
        onClick={() => onClickMethod('mailto', 'thgus7424@naver.com')}
      />
      <InquiryMethod
        icon={<BsTelephoneFill />}
        title="전화상담하기"
        desc="담당자와 1:1 전화상담이 가능합니다."
        onClick={() => onClickMethod('tel', '01045717424')}
      />
    </>
  );
};

export default InquiryContainer;
