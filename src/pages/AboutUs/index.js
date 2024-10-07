import React, { useEffect, useState } from "react";
import "./style.css";
import { useTranslation } from "react-i18next";
import { constants } from "../../services";
import { useSelector } from "react-redux";
import { Seo } from "../../components";

const Index = () => {
  const currentLangCode = useSelector((state) => state.system.currentLangCode);
  const { t } = useTranslation("main");
  const [activeIndex, setActiveIndex] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      const box = document.querySelector(".about-welcome");
      if (box) {
        box.classList.add("--active");
      }
    }, 500);
  }, []);

  const clickHandler = (ind) => {
    if (activeIndex === ind) {
      setActiveIndex(null);
    } else {
      setActiveIndex(ind);
    }
  };

  return (
    <div className="site-wrapper">
      <Seo alias={"about-us"} />

      <div className="about-welcome">
        <div className="container">
          <div className="about-welcome__wrapper">
            <img
              className="about-welcome__logo"
              src={require("./images/about-logo.png")}
              alt=""
            />
            <p
              className="about-welcome__text"
              data-translate={"aboutUsPageTopDescription"}
            >
              {constants.aboutUsPageTopDescription[currentLangCode]}
            </p>
            <a className="about-welcome__btn" href="https://youtu.be/U8WoqKA3g7I" target="_blank">
              <img src={require("./images/about-btn.svg")} alt="" />
            </a>
          </div>
        </div>
        <div className="about-welcome__slider" />
        <img
          className="about-welcome__decor"
          src={require("./images/about-bg.svg")}
          alt=""
        />
      </div>

      <section className="sec-padding">
        <div className="container">
          <div className="about-inner">
            {constants.aboutUsPageAdvantages.map((item, i) => {
              return (
                <div
                  key={item.id || i}
                  className={`about-item ${
                    activeIndex === item.id ? "--active" : ""
                  }`}
                >
                  <div className="about-item__title">
                    <div className="about-item__title-origin">
                      <span>
                        {item[`title_${currentLangCode}`].split(" ")[0]}
                      </span>
                      <div>
                        {item[`title_${currentLangCode}`]
                          .split(" ")
                          .slice(1)
                          .join(" ")}
                      </div>
                    </div>
                    <div className="about-item__title-fake">
                      {item[`title_${currentLangCode}`]
                        .split(" ")
                        .slice(1)
                        .join(" ")}
                    </div>
                  </div>
                  <img src={item.image} alt="" className="about-item__icon" />

                  <div className="about-item__description">
                    {item[`description_${currentLangCode}`]}
                  </div>

                  <div
                    className="about-item__btn"
                    onClick={() => clickHandler(item.id)}
                  >
                    <img src={require("../../assets/icon/add.svg")} alt="" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="about-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12 col-xl-5">
              <div className="about-wrapper__img">
                <img src={require("../../assets/images/about.png")} alt="" />
              </div>
            </div>
            <div className="col-12 col-xl-7">
              <div className="about-wrapper__top">
                <div className="about-wrapper__companies">
                  <img src={require("../../assets/icon/logo.svg")} alt="" />
                  <div className="about-wrapper__text">
                    {t("Технология производства компании")}
                  </div>
                </div>
                <div className="about-wrapper__book">
                  {t("Немецкое качество и технологии")}
                </div>
              </div>
              <div className="about-description">
                {constants.aboutUsPageContent[currentLangCode]}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
