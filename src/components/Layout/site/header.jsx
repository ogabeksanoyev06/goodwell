import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Language from "./components/language";
import { useSelector } from "react-redux";
import outsideClick from "../../../hooks/OutsideClick";
import qs from "qs";
import { useTranslation } from "react-i18next";
import get from "lodash/get";

const Header = () => {
  const { t } = useTranslation("main");
  const history = useHistory();
  const { ref, isVisible, setIsVisible } = outsideClick();

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const categories = useSelector((state) => state.system.categories);
  const settings = useSelector((state) => state.system.settings);
  const phoneHeader = settings.find((s) => s.slug === "phone-header");
  const currentLangCode = useSelector((state) => state.system.currentLangCode);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <header className={`header ${visible ? "" : "--hide"}`}>
      <div className="container">
        <div className="header-wrapper">
          <div ref={ref} className="d-flex" style={{ position: "relative" }}>
            <a href="/" className="header-logo">
              <img src={require("../../../assets/icon/logo.svg")} alt="" />
            </a>
            <div
              className="header-category"
              onClick={() => setIsVisible((prev) => !prev)}
            >
              <div className="header-category__img">
                {isVisible ? (
                  <img
                    src={require("../../../assets/icon/close.svg")}
                    alt=""
                    style={{ width: "15px" }}
                  />
                ) : (
                  <img
                    src={require("../../../assets/icon/menuBar.svg")}
                    alt=""
                  />
                )}
              </div>
              <span>{t("Каталог")}</span>
            </div>

            <div className={`categories-dropdown ${isVisible ? "--open" : ""}`}>
              {categories.map((category, i) => {
                const icon = get(category, "icon.thumbnails.small.src");
                return (
                  <div key={i}>
                    <div
                      className="parent-item"
                      onClick={() => {
                        setIsVisible(false);
                        const obj = btoa(
                          JSON.stringify({ categories: [category.id] })
                        );
                        history.push({
                          pathname: "/catalog",
                          search: qs.stringify(
                            { filterData: obj },
                            { encode: false }
                          ),
                        });
                      }}
                    >
                      <img
                        src={
                          icon
                            ? icon
                            : require("../../../assets/icon/category-icon.svg")
                        }
                        alt=""
                      />
                      {category[`name_${currentLangCode}`]}
                    </div>
                    {get(category, "children", []).length > 0 && (
                      <div className="children-menu">
                        <div className="wrap">
                          {get(category, "children", []).map((child, a) => {
                            const icon = get(
                              child,
                              "icon.thumbnails.small.src"
                            );

                            return (
                              <div
                                key={a}
                                onClick={() => {
                                  setIsVisible(false);
                                  const obj = btoa(
                                    JSON.stringify({ categories: [child.id] })
                                  );
                                  history.push({
                                    pathname: "/catalog",
                                    search: qs.stringify(
                                      { filterData: obj },
                                      { encode: false }
                                    ),
                                  });
                                }}
                              >
                                <img
                                  src={
                                    icon
                                      ? icon
                                      : require("../../../assets/icon/category-icon.svg")
                                  }
                                  alt=""
                                />
                                {child[`name_${currentLangCode}`]}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <ul className="header-list">
            <li>
              <Link to={"/"} className="header-link">
                {t("Главная")}
              </Link>
            </li>
            <li>
              <Link to={"/about-us"} className="header-link">
                {t("О нас")}
              </Link>
            </li>
            <li>
              <Link to={"/news"} className="header-link">
                {t("Новости")}
              </Link>
            </li>
            <li>
              <Link to={"/vacancies"} className="header-link">
                {t("Вакансии")}
              </Link>
            </li>
            <li>
              <Link to={"/contacts"} className="header-link">
                {t("Контакты")}
              </Link>
            </li>
          </ul>
          <Link to="/cart" className="header-category">
            <img src={require("../../../assets/icon/basket.svg")} alt="" />
            <span>{t("Корзина")}</span>
          </Link>

          <Language />

          <div className="header-search">
            <div className="header-search__wrapper">
              <img src={require("../../../assets/icon/search.svg")} alt="" />
              <input
                className="header-input"
                type="text"
                placeholder={t("Поиск")}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    history.push({
                      pathname: "/catalog",
                      search: `?_q=${e.target.value}`,
                    });
                  }
                }}
              />
            </div>
          </div>
          {phoneHeader ? (
            <a
              href={`tel:${phoneHeader.value}`}
              className="header-category --radius"
            >
              <img src={require("../../../assets/icon/phone.svg")} alt="" />
              <span>{phoneHeader.name}</span>
            </a>
          ) : (
            <div className="header-category --radius">
              <img src={require("../../../assets/icon/phone.svg")} alt="" />
              <span>(71)-000-00-00</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
