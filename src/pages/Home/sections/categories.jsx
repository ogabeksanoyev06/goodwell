import React from "react";
import { Link } from "react-router-dom";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import get from "lodash/get";
import { useHistory } from "react-router";
import qs from "qs";

const Categories = ({ categories, currentLangCode, t }) => {
  const history = useHistory();

  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  return (
    <section className="sec-padding category-section">
      <div className="container">
        <div className="m-box">
          <h1 className="m-title">{t("Категории")}</h1>
          <Link to={"/catalog"} className="m-link">
            {t("Все категории")}
          </Link>
        </div>
        <div className="category-section__wrapper">
          <Swiper
            spaceBetween={15}
            breakpoints={{
              1600: {
                slidesPerView: 6,
              },
              1400: {
                slidesPerView: 5,
              },
              992: {
                slidesPerView: 4,
              },
              300: {
                slidesPerView: 2,
              },
            }}
            speed={1000}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Navigation]}
            className="category-section__slider"
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
          >
            {categories.length > 0
              ? categories.map((item, idx) => {
                  return (
                    <SwiperSlide key={idx + 6}>
                      <div
                        onClick={() => {
                          const obj = btoa(
                            JSON.stringify({ categories: [item.id] })
                          );
                          history.push({
                            pathname: `/catalog/${item.slug}`,
                          });
                        }}
                        className="category-card"
                      >
                        <div className="category-card__img">
                          <img
                            src={get(item, "file.thumbnails.low.src")}
                            alt={item[`name_${currentLangCode}`]}
                          />
                        </div>
                        <div className="category-card__title">
                          {item[`name_${currentLangCode}`]}
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })
              : [...Array(6)].map((item, idx) => {
                  return (
                    <SwiperSlide key={idx}>
                      <div className="category-card">
                        <div
                          className="category-card__img"
                          style={{
                            position: "relative",
                            height: "190px",
                            width: "100%",
                          }}
                        >
                          <div className="skeleton-background p-abs"></div>
                        </div>
                        <div
                          className="category-card__title"
                          style={{ padding: "0 30px", width: "100%" }}
                        >
                          <div className="skeleton-background h-20 w-100"></div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
          </Swiper>

          {categories.length > 6 && (
            <>
              <div className="category-section-prev" ref={navigationPrevRef}>
                <img
                  src={require("../../../assets/icon/sliderPrev.svg")}
                  alt="Previous"
                />
              </div>
              <div className="category-section-next" ref={navigationNextRef}>
                <img
                  src={require("../../../assets/icon/sliderNext.svg")}
                  alt="Next"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Categories;
