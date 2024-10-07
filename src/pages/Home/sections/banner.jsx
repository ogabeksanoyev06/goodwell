import React, { useEffect, useRef, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper";
import { Link } from "react-router-dom";
import get from "lodash/get";

const Banner = ({ banners, currentLangCode }) => {
  const [isMobile, setIsMobile] = useState(false);
  const swiperRef = useRef();

  React.useEffect(() => {
    window.addEventListener("resize", setResponsiveSize);

    return (_) => {
      window.removeEventListener("resize", setResponsiveSize);
    };
  });

  useEffect(() => {
    setResponsiveSize();
  }, []);

  function setResponsiveSize() {
    if (window.innerWidth > 768) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  }

  return (
    <section>
      {banners.length > 0 ? (
        <div className="container">
          <Swiper
            autoHeight={true}
            ref={swiperRef}
            loop={true}
            spaceBetween={15}
            slidesPerView={1}
            speed={1000}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Navigation]}
            className="banner-slider"
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
          >
            {banners.map((item, idx) => {
              const bannerLink = item[`link_${currentLangCode}`] || "/"; // Fallback to root if the link is null or undefined
              return (
                <SwiperSlide key={idx + 7}>
                  {bannerLink ? (
                    <Link to={bannerLink} className="banner-slider__img">
                      {isMobile ? (
                        <img
                          src={
                            get(item, `mobile_file_${currentLangCode}.domain`) +
                            get(item, `mobile_file_${currentLangCode}.folder`) +
                            get(item, `mobile_file_${currentLangCode}.file`)
                          }
                          alt=""
                        />
                      ) : (
                        <img
                          src={
                            get(item, `file_${currentLangCode}.domain`) +
                            get(item, `file_${currentLangCode}.folder`) +
                            get(item, `file_${currentLangCode}.file`)
                          }
                          alt=""
                        />
                      )}
                    </Link>
                  ) : (
                    <div className="banner-slider__img">
                      {isMobile ? (
                        <img
                          src={
                            get(item, `mobile_file_${currentLangCode}.domain`) +
                            get(item, `mobile_file_${currentLangCode}.folder`) +
                            get(item, `mobile_file_${currentLangCode}.file`)
                          }
                          alt=""
                        />
                      ) : (
                        <img
                          src={
                            get(item, `file_${currentLangCode}.domain`) +
                            get(item, `file_${currentLangCode}.folder`) +
                            get(item, `file_${currentLangCode}.file`)
                          }
                          alt=""
                        />
                      )}
                    </div>
                  )}
                </SwiperSlide>
              );
            })}
            <div className="swiper-btn swiper-button-prev">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.71 11.7102C6.80373 11.6172 6.87812 11.5066 6.92889 11.3848C6.97966 11.2629 7.0058 11.1322 7.0058 11.0002C7.0058 10.8682 6.97966 10.7375 6.92889 10.6156C6.87812 10.4937 6.80373 10.3831 6.71 10.2902L3.41 7.00019L11 7.00019C11.2652 7.00019 11.5196 6.89483 11.7071 6.70729C11.8946 6.51976 12 6.2654 12 6.00019C12 5.73497 11.8946 5.48062 11.7071 5.29308C11.5196 5.10554 11.2652 5.00019 11 5.00019L3.41 5.00019L6.71 1.71019C6.8983 1.52188 7.00409 1.26649 7.00409 1.00019C7.00409 0.733884 6.8983 0.478489 6.71 0.290185C6.5217 0.101882 6.2663 -0.0039065 6 -0.00390651C5.7337 -0.00390652 5.4783 0.101881 5.29 0.290185L0.290001 5.29018C0.19896 5.38529 0.127594 5.49743 0.0799997 5.62018C0.0270945 5.73989 -0.000232953 5.86931 -0.000232959 6.00018C-0.000232965 6.13106 0.0270944 6.26048 0.0799996 6.38019C0.127594 6.50294 0.19896 6.61508 0.290001 6.71019L5.29 11.7102C5.38296 11.8039 5.49356 11.8783 5.61542 11.9291C5.73728 11.9798 5.86799 12.006 6 12.006C6.13201 12.006 6.26272 11.9798 6.38458 11.9291C6.50644 11.8783 6.61704 11.8039 6.71 11.7102Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="swiper-btn swiper-button-next">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.29 11.7102C5.19627 11.6172 5.12188 11.5066 5.07111 11.3848C5.02034 11.2629 4.9942 11.1322 4.9942 11.0002C4.9942 10.8682 5.02034 10.7375 5.07111 10.6156C5.12188 10.4937 5.19627 10.3831 5.29 10.2902L8.59 7.00019L1 7.00019C0.734784 7.00019 0.48043 6.89483 0.292894 6.70729C0.105357 6.51976 2.7404e-07 6.2654 2.62447e-07 6.00019C2.50854e-07 5.73497 0.105357 5.48062 0.292894 5.29308C0.48043 5.10554 0.734784 5.00019 1 5.00019L8.59 5.00019L5.29 1.71019C5.1017 1.52188 4.99591 1.26649 4.99591 1.00019C4.99591 0.733884 5.1017 0.478489 5.29 0.290185C5.4783 0.101882 5.7337 -0.0039065 6 -0.00390651C6.2663 -0.00390652 6.5217 0.101881 6.71 0.290185L11.71 5.29018C11.801 5.38529 11.8724 5.49743 11.92 5.62018C11.9729 5.73989 12.0002 5.86931 12.0002 6.00018C12.0002 6.13106 11.9729 6.26048 11.92 6.38019C11.8724 6.50294 11.801 6.61508 11.71 6.71019L6.71 11.7102C6.61704 11.8039 6.50644 11.8783 6.38458 11.9291C6.26272 11.9798 6.13201 12.006 6 12.006C5.86799 12.006 5.73728 11.9798 5.61542 11.9291C5.49356 11.8783 5.38296 11.8039 5.29 11.7102Z"
                  fill="white"
                />
              </svg>
            </div>
          </Swiper>
        </div>
      ) : (
        <div className="container">
          <div className="banner-slider" style={{ marginBottom: "20px" }}>
            <div className="banner-slider__img">
              <div
                className="skeleton-background p-abs"
                style={{ borderRadius: "20px" }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Banner;
