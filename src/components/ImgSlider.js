/* eslint-disable */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const ImgSlider = ({ items, CardComponent }) => {
  return (
    <div className="relative overflow-hidden max-w-full mx-auto">
      <Swiper
        modules={[Navigation, EffectFade]}
        fadeEffect={true}
        navigation
        slidesPerView={1}
        centeredSlides={true}
        centeredSlidesBounds={true}
        loop={true}
      >
        {items.map((item, index) => (
          <SwiperSlide
            key={index}
            className="flex justify-content-center align-items-center h-lvh"
          >
            <CardComponent {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImgSlider;
