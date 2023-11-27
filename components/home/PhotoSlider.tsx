import PostIt from './PostIt';
import React from 'react';
import styled from 'styled-components';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

const PhotoSlider = () => {
  return (
    <Container>
      <StyledSwiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>슬라이드1</SwiperSlide>
        <SwiperSlide>슬라이드2</SwiperSlide>
        <SwiperSlide>슬라이드3</SwiperSlide>
        <SwiperSlide>슬라이드4</SwiperSlide>
      </StyledSwiper>
      <PostIt />
    </Container>
  );
};
const Container = styled.div`
  position: relative;
`;
const StyledSwiper = styled(Swiper)`
  border: 1px solid #ddd;
  aspect-ratio: 1 / 0.7;
  margin-bottom: 40px;
  .swiper-slide {
    width: 100%;
    height: 100%;
    background-color: #ddd;
  }
`;

export default PhotoSlider;
