import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import get from "lodash/get";
import { helpers } from "../../../services";

const NewsSection = ({
  items,
  title,
  hasAllBtn = false,
  currentLangCode,
  t,
}) => {
  useEffect(() => {
    if (items.length > 0) {
      setTimeout(() => {
        const imageCardHeight = document.querySelector(".news-card__img")
          ? document.querySelector(".news-card__img").clientHeight
          : 0;
        const arrows = document.querySelectorAll(".news-section-button");
        if (arrows.length > 0) {
          arrows.forEach((arrow) => {
            arrow.style.top = `${imageCardHeight / 2}px`;
            arrow.style.opacity = 1;
          });
        }
      }, 500);
    }
  }, [items]);
  return (
    <section className="sec-padding news-section">
      <div className="container">
        <div className="m-box">
          <h1 className="m-title">{title ? title : t("Новости")}</h1>
          {hasAllBtn && items.length > 4 && (
            <Link to={"/news"} className="m-link">
              {t("Все новости")}
            </Link>
          )}
        </div>
        {items.length > 0 && (
          <div className="news-section__wrapper">
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
              className="news-section__slider"
              navigation={{
                prevEl: ".news-section-prev",
                nextEl: ".news-section-next",
              }}
            >
              {items.map((item, idx) => (
                <SwiperSlide key={item.id || item.slug || idx}>
                  <Link to={`/news/${item.slug}`} className="news-card">
                    <div className="news-card__img">
                      <img
                        src={get(item, "file.thumbnails.low.src")}
                        alt={get(item, "title")}
                      />
                    </div>
                    <div className="news-card__date">
                      {helpers.formatDate(item.published_at)}
                    </div>
                    <div className="news-card__title">{get(item, "title")}</div>
                    <div className="news-card__subtitle">
                      {get(item, "description")}
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
            {items.length > 4 && (
              <>
                <div className="news-section-button news-section-prev">
                  <img
                    src={require("../../../assets/icon/sliderPrev.svg")}
                    alt="prev"
                  />
                </div>
                <div className="news-section-button news-section-next">
                  <img
                    src={require("../../../assets/icon/sliderNext.svg")}
                    alt="next"
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

export default NewsSection;
