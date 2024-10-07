import React, { useState } from "react";
import { Trans } from "react-i18next";
import { constants } from "../../../services";

const BranchSection = ({ t, currentLangCode }) => {
  const [activeTab, setActiveTab] = useState(null);
  const handleClick = (val) => {
    if (val === activeTab) {
      setActiveTab(null);
    } else {
      setActiveTab(val);
    }
  };
  return (
    <section className="sec-padding branch-section">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 col-xl-6">
            <div className="branch-section__box">
              <div className="branch-section__item">
                <div className="branch-section__title">
                  <Trans t={t}>Наши филиалы</Trans>
                </div>
                <div className="branch-section__goodwell">
                  <img src={require("../../../assets/icon/logo.svg")} alt="" />
                  <span>{t("Мы рядом")}</span>
                </div>
              </div>
              <div className="branch-section__link">
                <div className="branch-section__img">
                  <img
                    src={require("../../../assets/images/branch.png")}
                    alt=""
                  />
                </div>
                <div className="branch-section__imfo">
                  <img src={require("../../../assets/icon/360.svg")} alt="" />
                  <div className="branch-section__text">{t("Шоурум")}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-6">
            <div className="accordion">
              {constants.showRooms.map((item, index) => (
                <div className="accordion-item" key={index}>
                  <div
                    className={`accordion-header ${
                      activeTab === item.id ? "active" : ""
                    }`}
                    onClick={() => handleClick(item.id)}
                  >
                    <span>{item.number}</span> {item[`name_${currentLangCode}`]}
                    <img
                      src={require("../../../assets/icon/accordionArrow.svg")}
                      alt=""
                    />
                  </div>
                  <div
                    className={`accordion-body ${
                      activeTab === item.id ? "active" : ""
                    }`}
                  >
                    <p>{item[`description_${currentLangCode}`]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BranchSection;
