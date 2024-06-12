import { Polaroids } from '@typess/diary';

import { Modal } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface DiarySwiperModalProps {
  polaroids: Polaroids;
  startDate?: string;
  onClose: () => void;
}

const DiarySwiperModal: React.FC<DiarySwiperModalProps> = ({
  polaroids,
  startDate,
  onClose,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>();

  return (
    <>
      <StyledModal open onCancel={onClose}>
        <>
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            observer={true}
            observeParents={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Autoplay, FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
          >
            {polaroids.map((polaroid) => (
              <SwiperSlide key={polaroid.id} className="topSlide">
                <img src={polaroid.imagePath} />
                <div className="textBox">
                  <p className="date">
                    {dayjs(polaroid.date).format('YYYY.MM.DD(ddd)')}
                  </p>
                  <p className="dDay">
                    {dayjs(polaroid.date).format('YYYY-MM-DD') === startDate
                      ? '첫 만난날'
                      : Math.floor(
                            (new Date().getTime() -
                              new Date(String(polaroid.date)).getTime()) /
                              (1000 * 3600 * 24),
                          ) === 0
                        ? '오늘'
                        : `D+${Math.floor(
                            (new Date().getTime() -
                              new Date(String(polaroid.date)).getTime()) /
                              (1000 * 3600 * 24),
                          )}`}
                  </p>
                  <p className="title">{polaroid.title}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
            {polaroids.map((polaroid) => (
              <SwiperSlide key={polaroid.id}>
                <img src={polaroid.imagePath} alt={polaroid.title} />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      </StyledModal>
    </>
  );
};

const StyledModal = styled(Modal)`
  .ant-modal-content {
    padding: 0;
    background-color: transparent;
    .swiper-slide {
      position: relative;
      aspect-ratio: 1/1;
      .textBox {
        position: absolute;
        top: 50px;
        left: 80px;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.white};
        @media ${({ theme }) => theme.devices.mobile} {
          top: 30px;
          left: 40px;
        }
        .date {
          font-size: 24px;
          @media ${({ theme }) => theme.devices.mobile} {
            font-size: 20px;
          }
        }
        .dDay {
          font-size: 20px;
          @media ${({ theme }) => theme.devices.mobile} {
            font-size: 18px;
          }
        }
        .title {
          font-size: 24px;
          font-weight: normal;
          @media ${({ theme }) => theme.devices.mobile} {
            font-size: 16px;
          }
        }
      }
      &.topSlide::before {
        content: '';
        position: absolute;
        display: block;
        width: 100%;
        height: 200px;
        background-image: linear-gradient(
          to top,
          transparent 0%,
          ${({ theme }) => theme.colors.black} 100%
        );
      }
    }
    .swiper-button-prev,
    .swiper-button-next {
      background-color: ${({ theme }) => theme.colors.white};
      opacity: 0.5;
      padding: 15px 5px;
      border-radius: 20px;
      color: ${({ theme }) => theme.colors.black};
    }

    .swiper-button-prev:after,
    .swiper-button-next:after {
      font-size: 1.1rem !important;
      font-weight: 600 !important;
    }
  }
  .ant-modal-close-x {
    svg {
      color: ${({ theme }) => theme.colors.white};
    }
  }
  .ant-modal-footer {
    display: none;
  }
`;

export default DiarySwiperModal;
