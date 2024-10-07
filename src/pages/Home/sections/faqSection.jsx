import React, { useState } from "react";

const FaqSection = ({ items, t, currentLangCode }) => {
  const [activeTab, setActiveTab] = useState(null);
  const handleClick = (val) => {
    if (val === activeTab) {
      setActiveTab(null);
    } else {
      setActiveTab(val);
    }
  };
  return (
    <section className="faq-section">
      <div className="container">
        <div className="m-box">
          <h1 className="m-title --big">
            {t("FAQ(Часто задаваемые вопросы)")}
          </h1>
        </div>
        <div className="row">
          {items.map((item, index) => {
            const ind = index + 1;
            return (
              <div className="col-6" key={index + 9}>
                <div className="accordion-item">
                  <div
                    className={`accordion-header ${
                      activeTab === item.id ? "active" : ""
                    }`}
                    onClick={() => handleClick(item.id)}
                  >
                    <div>
                      <span>{ind > 9 ? ind : `0${ind}`}</span>
                      {item[`title_${currentLangCode}`]}
                    </div>
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
