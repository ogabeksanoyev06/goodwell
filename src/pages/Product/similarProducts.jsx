import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { Link } from "react-router-dom";
import get from "lodash/get";
import { helpers } from "../../services";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const SimilarProducts = ({ items }) => {
  const currentLangCode = useSelector((state) => state.system.currentLangCode);
  const { t } = useTranslation("main");
  return (
    <div className="category-section__wrapper">
      <Swiper
        loop={true}
        spaceBetween={15}
        slidesPerView={1}
        breakpoints={{
          1400: {
            slidesPerView: 4,
          },
          992: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 2,
          },
        }}
        speed={1000}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Navigation]}
        className="product-section__slider"
        navigation={{
          prevEl: ".product-section-prev",
          nextEl: ".product-section-next",
        }}
      >
        {items.map((item, idx) => {
          return (
            <SwiperSlide key={idx + 4}>
              <Link to={`/product/${item.slug}`} className="product-card-v2">
                <div className="product-card-v2__img">
                  <img
                    src={get(item, "file.thumbnails.low.src")}
                    alt={get(item, "translate.title")}
                  />
                </div>
                <div className="product-card-v2__info">
                  <div className="product-card-v2__box">
                    <span>{t("Категория")}: </span>
                    {get(item, `category.name_${currentLangCode}`)}
                  </div>
                  <div className="product-card-v2__box">
                    <span>{t("Названия")}: </span>
                    {get(item, "translate.title")}
                  </div>
                  <div className="product-card-v2__box">
                    <span>{t("Цена")}: </span>
                    {helpers.convertToReadable(item.price)} {t("сум")}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/*{items.length > 4 && (*/}
      {/*	<>*/}
      {/*		<div className="product-section-prev">*/}
      {/*			<img src={require("/assets/icon/sliderPrev.svg")} alt="" />*/}
      {/*		</div>*/}
      {/*		<div className="product-section-next">*/}
      {/*			<img src={require("/assets/icon/sliderNext.svg")} alt="" />*/}
      {/*		</div>*/}
      {/*	</>*/}
      {/*)}*/}
    </div>
  );
};

export default SimilarProducts;
