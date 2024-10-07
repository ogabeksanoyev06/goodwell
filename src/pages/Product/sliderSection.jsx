import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper";
import "swiper/modules/thumbs/thumbs.min.css";

const SliderSection = ({ images, setIsThumbOpen, setPhotoIndex }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      <Swiper
        direction={"vertical"}
        modules={[Thumbs]}
        watchSlidesProgress
        onSwiper={setThumbsSwiper}
        spaceBetween={15}
        slidesPerView={"auto"}
        loop={true}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i + 1}>
            <div className="">
              <img src={img} alt="banner" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper modules={[Thumbs]} thumbs={{ swiper: thumbsSwiper }}>
        {images.map((img, index) => (
          <SwiperSlide
            className="product-main-slider"
            key={index + 2}
            onClick={() => {
              setIsThumbOpen(true);
              setPhotoIndex(index);
            }}
          >
            <img src={img} alt="banner" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SliderSection;
