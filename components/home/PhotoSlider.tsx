import { Connect } from '@typess/connect';

import PostIt from './PostIt';
import React from 'react';
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface PhotoSliderProps {
  connect?: Connect;
  images: any;
}

const PhotoSlider: React.FC<PhotoSliderProps> = ({ connect, images }) => {
  console.log(images);
  return (
    <Container>
      {connect?.sliderStatus === 'Y' && images ? (
        <StyledSwiper
          slidesPerView={1}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          onSlideChange={() => console.log('slide change')}
        >
          {images.map((image: any) => (
            <SwiperSlide key={image.id}>
              <img src={image.imagePath} alt="배경이미지" />
            </SwiperSlide>
          ))}
        </StyledSwiper>
      ) : (
        'ss'
      )}
      {connect?.postitStatus === 'Y' && <PostIt info={connect} />}
    </Container>
  );
};
const Container = styled.div`
  position: relative;
`;
const StyledSwiper = styled(Swiper)`
  background-color: #ddd;
  aspect-ratio: 1 / 0.7;
  margin-bottom: 40px;
  .swiper-slide {
    width: 100%;
    height: 100%;
    background-color: #ddd;
  }
  .swiper-pagination-bullet-active {
    background-color: ${({ theme }) => theme.colors.subColor};
  }
`;

export default PhotoSlider;
