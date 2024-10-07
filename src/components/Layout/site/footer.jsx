import React from "react";
import { useTranslation } from "react-i18next";
import { constants } from "../../../services";
import { useSelector } from "react-redux";
import get from "lodash/get";

const Footer = ({ settings }) => {
  const { t } = useTranslation("main");
  const currentLangCode = useSelector((state) => state.system.currentLangCode);
  const address = settings.find((s) => s.slug === "address");
  const phone1 = settings.find((s) => s.slug === "phone-footer-1");
  const phone2 = settings.find((s) => s.slug === "phone-footer-2");
  const socials = settings.filter((s) => s.alias === "socials");

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrap">
          <div className="footer__wrap-left">
            <div className="footer-subtitle">{t("Оставить заявку")}</div>
            <div className="footer-text">
              {t(
                "Оставьте заявку на нашем сайти и наш оператор свяжеться с вами в ближайшее время"
              )}
            </div>
            <form className="footer-form">
              <div className="footer-box">
                <input
                  type="text"
                  className="footer-input"
                  placeholder={t("Имя Фамилия")}
                />
              </div>
              <div className="footer-box">
                <input
                  type="text"
                  className="footer-input"
                  placeholder={t("Номер телефона")}
                />
              </div>
              <div className="footer-box">
                <textarea
                  className="footer-textarea"
                  placeholder={t("Введите текст")}
                ></textarea>
              </div>
              <button className="btn btn-main">
                <span>{t("Отправить")}</span>
              </button>
            </form>
            <div className="footer-mini">
              {t(
                "Все содержимое этого сайта является собственностью Goodwell®"
              )}
            </div>
            <div className="footer-mini footer-copyright">
              {t("©2024 Все права защищены")}
            </div>
            {socials.length > 0 && (
              <ul className="footer-social">
                {socials.map((social, a) => (
                  <li key={a}>
                    <a
                      href={social.value}
                      target={"_blank"}
                      className="footer-icon"
                    >
                      <img
                        src={get(social, "file.thumbnails.small.src")}
                        alt=""
                      />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="footer__wrap-right">
            <div className="footer-wrapper">
              <div className="footer-top">
                <div className="footer-logo">
                  <img
                    src={require("../../../assets/icon/footerLogo.svg")}
                    alt=""
                  />
                </div>
                <div className="footer-mini">
                  {constants.footerDescription[currentLangCode]}
                </div>
                <div className="footer-center">
                  {address && (
                    <div className="footer-item">
                      <div className="footer-type">{t("Адрес")}:</div>
                      <div>
                        <div className="footer-link">{address.value}</div>
                      </div>
                    </div>
                  )}
                  <div className="footer-item">
                    <div className="footer-type">
                      {t("Телефон для справок")}:
                    </div>
                    <div className="footer-df">
                      {phone1 && (
                        <a href={`tel:${phone1.value}`} className="footer-link">
                          {phone1.name}
                        </a>
                      )}
                      {phone2 && (
                        <a href={`tel:${phone2.value}`} className="footer-link">
                          {phone2.name}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="footer-top">
                <div className="footer-text">{t("Made by ABBA")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
