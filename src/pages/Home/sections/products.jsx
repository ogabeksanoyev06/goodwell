import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { ProductCard } from "../../../components/Cards";

const Products = ({ homeProducts, currentLangCode, t }) => {
  return (
    <section className="sec-padding product-section">
      <div className="container">
        <div className="m-box">
          <h1 className="m-title">{t("Новинки и акции")}</h1>
          {homeProducts.length > 4 && (
            <Link to={"/catalog"} className="m-link">
              {t("Все товары")}
            </Link>
          )}
        </div>
        {homeProducts.length > 0 && (
          <div className="category-section__wrapper">
            <Swiper
              loop={true}
              spaceBetween={15}
              slidesPerView={1}
              breakpoints={{
                1600: {
                  slidesPerView: 5,
                },
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
              {homeProducts.map((item, idx) => {
                return (
                  <SwiperSlide key={idx}>
                    <ProductCard {...{ item, currentLangCode, t }} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            {homeProducts.length > 4 && (
              <>
                <div className="product-section-prev">
                  <img
                    src={require("../../../assets/icon/sliderPrev.svg")}
                    alt=""
                  />
                </div>
                <div className="product-section-next">
                  <img
                    src={require("../../../assets/icon/sliderNext.svg")}
                    alt=""
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
