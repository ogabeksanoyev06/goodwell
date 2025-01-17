import React, { useEffect } from "react";
import "./style.css";
import { Trans } from "react-i18next";
import { constants } from "../../../../services";

const AboutCompany = ({ t, currentLangCode }) => {
  const scrollFunc = (e) => {
    const blocks = document.querySelectorAll(".about-company__block");
    let w = 0;
    blocks.forEach((block, index) => {
      w += block.clientWidth;
    });
    const elemWrap = document.querySelector(".about-company-wrap");
    const elem = document.querySelector(".about-company");
    const width = w - elemWrap.clientWidth;

    if (elem) {
      const elemOffsetTop = elem.getBoundingClientRect().top;
      const elemWidth = width;
      const elemHeight = elem.clientHeight;
      const canElemWrapHeight = elemHeight + elemWidth;
      const transformVal = elemWrap.getBoundingClientRect().top * -1;

      if (elemOffsetTop < 1 && elemOffsetTop >= 0) {
        elemWrap.style.height = canElemWrapHeight + "px";
        elem.style.transform = `translateX(-${transformVal}px)`;
      }
      if (elemOffsetTop < 250) {
        elem.classList.add("--first-animation");
      } else {
        elem.classList.remove("--first-animation");
      }
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", scrollFunc);

    return () => {
      document.removeEventListener("scroll", scrollFunc);
    };
  }, []);

  return (
    <>
      <div className="about-company__block panel">
        <div className="about-company__welcome">
          <div className="about-company__logo">
            <img src={require("./images/logo-left.png")} alt="" />
            <img src={require("./images/logo-right.png")} alt="" />
          </div>
          <div className="about-company__caption">
            <div>
              {constants.homeAboutSections[0][`name_${currentLangCode}`]}
            </div>
            <div>
              {constants.homeAboutSections[0][`description_${currentLangCode}`]}
            </div>
          </div>
          <div className="about-company__img">
            <Trans t={t}>
              <span>
                Качество,
                <br />
                проверенное
                <br />
                годами
              </span>
            </Trans>
            <img src={require("./images/welcome.png")} alt="" />
          </div>
          <div className="about-company__scroll">
            {t("Скрольте дальше")}
            <svg
              width="40"
              height="20"
              viewBox="0 0 40 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_111_83)">
                <path
                  d="M31.7307 9.27517C32.1485 9.66882 32.1499 10.3326 31.7337 10.728L24.3158 17.775C23.6609 18.3972 24.1012 19.5 25.0045 19.5H29.6007C29.8571 19.5 30.1036 19.4016 30.2895 19.225L39.2368 10.725C39.6518 10.3307 39.6518 9.66925 39.2368 9.275L30.2895 0.775C30.1036 0.598443 29.8571 0.5 29.6007 0.5H24.9366C24.0313 0.5 23.5919 1.60701 24.2508 2.22784L31.7307 9.27517ZM0 1.5C0 0.947715 0.447716 0.5 1 0.5H14.6007C14.8571 0.5 15.1036 0.598443 15.2895 0.775001L24.2368 9.275C24.6518 9.66925 24.6518 10.3307 24.2368 10.725L15.2895 19.225C15.1036 19.4016 14.8571 19.5 14.6007 19.5H1C0.447716 19.5 0 19.0523 0 18.5V1.5Z"
                  fill="#222222"
                />
              </g>
              <defs>
                <clipPath id="clip0_111_83">
                  <rect
                    width="40"
                    height="19"
                    rx="9.5"
                    transform="matrix(-1 0 0 1 40 0.5)"
                    fill="white"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div className="about-company__block panel">
        <div className="about-company__target">
          <div className="about-company__caption --white">
            <div>
              {constants.homeAboutSections[1][`name_${currentLangCode}`]}
            </div>
            <div>
              {constants.homeAboutSections[1][`description_${currentLangCode}`]}
              <div className="about-company__title">
                {constants.homeAboutSections[1][`name_${currentLangCode}`]}
              </div>
            </div>
          </div>
          <div className="about-company__scroll --white">
            {t("Скрольте дальше")}
            <svg
              width="40"
              height="20"
              viewBox="0 0 40 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_111_83)">
                <path
                  d="M31.7307 9.27517C32.1485 9.66882 32.1499 10.3326 31.7337 10.728L24.3158 17.775C23.6609 18.3972 24.1012 19.5 25.0045 19.5H29.6007C29.8571 19.5 30.1036 19.4016 30.2895 19.225L39.2368 10.725C39.6518 10.3307 39.6518 9.66925 39.2368 9.275L30.2895 0.775C30.1036 0.598443 29.8571 0.5 29.6007 0.5H24.9366C24.0313 0.5 23.5919 1.60701 24.2508 2.22784L31.7307 9.27517ZM0 1.5C0 0.947715 0.447716 0.5 1 0.5H14.6007C14.8571 0.5 15.1036 0.598443 15.2895 0.775001L24.2368 9.275C24.6518 9.66925 24.6518 10.3307 24.2368 10.725L15.2895 19.225C15.1036 19.4016 14.8571 19.5 14.6007 19.5H1C0.447716 19.5 0 19.0523 0 18.5V1.5Z"
                  fill="#222222"
                />
              </g>
              <defs>
                <clipPath id="clip0_111_83">
                  <rect
                    width="40"
                    height="19"
                    rx="9.5"
                    transform="matrix(-1 0 0 1 40 0.5)"
                    fill="white"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>

          <div className="about-company__target-img">
            <img src={require("./images/target.png")} alt="" />
          </div>
        </div>
      </div>
      <div className="about-company__block panel">
        <div className="about-company__quality">
          <div>
            <div className="about-company__caption --white">
              <div>
                {constants.homeAboutSections[2][`name_${currentLangCode}`]}
              </div>
              <div>
                {
                  constants.homeAboutSections[2][
                    `description_${currentLangCode}`
                  ]
                }
              </div>
            </div>
            <div className="about-company__subtitle">
              {constants.homeAboutSections[2][`name_${currentLangCode}`]}
            </div>
          </div>

          <div className="about-company__scroll --white">
            {t("Скрольте дальше")}
            <svg
              width="40"
              height="20"
              viewBox="0 0 40 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_111_83)">
                <path
                  d="M31.7307 9.27517C32.1485 9.66882 32.1499 10.3326 31.7337 10.728L24.3158 17.775C23.6609 18.3972 24.1012 19.5 25.0045 19.5H29.6007C29.8571 19.5 30.1036 19.4016 30.2895 19.225L39.2368 10.725C39.6518 10.3307 39.6518 9.66925 39.2368 9.275L30.2895 0.775C30.1036 0.598443 29.8571 0.5 29.6007 0.5H24.9366C24.0313 0.5 23.5919 1.60701 24.2508 2.22784L31.7307 9.27517ZM0 1.5C0 0.947715 0.447716 0.5 1 0.5H14.6007C14.8571 0.5 15.1036 0.598443 15.2895 0.775001L24.2368 9.275C24.6518 9.66925 24.6518 10.3307 24.2368 10.725L15.2895 19.225C15.1036 19.4016 14.8571 19.5 14.6007 19.5H1C0.447716 19.5 0 19.0523 0 18.5V1.5Z"
                  fill="#222222"
                />
              </g>
              <defs>
                <clipPath id="clip0_111_83">
                  <rect
                    width="40"
                    height="19"
                    rx="9.5"
                    transform="matrix(-1 0 0 1 40 0.5)"
                    fill="white"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div className="about-company__block panel">
        <img src={require("./images/gallery1.png")} alt="" />
      </div>
      <div className="about-company__block panel">
        <img src={require("./images/gallery2.png")} alt="" />
      </div>
      <div className="about-company__block panel">
        <img src={require("./images/gallery3.png")} alt="" />
      </div>
    </>
  );
};

export default AboutCompany;
