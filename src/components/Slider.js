/* eslint-disable */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const Slider = ({ items, CardComponent }) => {
  return (
    <div className="relative overflow-hidden max-w-full mx-auto">
      <Swiper
        modules={[Navigation, EffectFade]}
        fadeEffect={true}
        spaceBetween={15}
        navigation
        slidesPerView={3}
        centeredSlides={true}
        centeredSlidesBounds={true}
        loop={true}
        className="w-[1200px]"
      >
        {items.map((item, index) => (
          <SwiperSlide
            key={index}
            className="flex justify-content-center align-items-center"
          >
            <CardComponent {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
