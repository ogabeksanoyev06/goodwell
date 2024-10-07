import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import get from "lodash/get";
import { Modal } from "../../../components";
import HTMLParser from "react-html-parser";

const VideoSection = ({ items, t }) => {
  const [selected, setSelected] = useState(null);
  const [modal, showModal] = useState(false);

  return (
    <section className="sec-padding media-section">
      <Modal
        size={800}
        isOpen={modal}
        toggle={() => showModal(false)}
        closeIcon={true}
      >
        <div className="youtube-video-modal">
          {HTMLParser(get(selected, "description", ""))}
        </div>
      </Modal>

      <div className="container">
        <div className="m-box">
          <h1 className="m-title">{t("Видеоматериалы")}</h1>
        </div>
        {items.length > 0 && (
          <div className="media-section__wrapper">
            <Swiper
              loop={10}
              spaceBetween={15}
              slidesPerView={1}
              speed={1000}
              modules={[Navigation]}
              className="media-section__slider"
              navigation={{
                prevEl: ".media-section .swiper-btn-white.--prev",
                nextEl: ".media-section .swiper-btn-white.--next",
              }}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
              }}
            >
              {items.map((item) => {
                return (
                  <SwiperSlide key={item.id}>
                    <div
                      className="media-card"
                      onClick={() => {
                        setSelected(item);
                        showModal(true);
                      }}
                    >
                      <div className="media-card__img">
                        <img
                          src={get(item, "file.thumbnails.low.src")}
                          alt={`${get(item, "title", "video")}`}
                        />
                      </div>
                      <div className="media-card__box">
                        <div className="media-card__play">
                          <img
                            src={require("../../../assets/icon/play.svg")}
                            alt="Play video"
                          />
                        </div>
                        <span>{t("Смотреть")}</span>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            {items.length > 2 && (
              <>
                <div className="swiper-btn-white --prev --default">
                  <img
                    src={require("../../../assets/icon/sliderPrev.svg")}
                    alt="Previous slide" // Oldingi slayd uchun alt matni
                  />
                </div>
                <div className="swiper-btn-white --next --default">
                  <img
                    src={require("../../../assets/icon/sliderNext.svg")}
                    alt="Next slide" // Keyingi slayd uchun alt matni
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

export default VideoSection;
