import React from "react";
import { Trans } from "react-i18next";

const AboutUs = ({ t }) => {
	return (
		<section className="sec-padding about-us">
			<div className="container">
				<div className="about-us__top">
					<div className="about-us__logo"><img src={require("../../../assets/icon/logoRed.svg")} alt="" /></div>
					<div className="about-us__title">{t("Мы рады что вы выбираете нас")}</div>
					<div className="about-us__text">
						<Trans t={t}>
							Goodwell - это компания, которая первыми представила широкий ассортимент встраеваемый бытовой
							техники для Medium и Medium+ уровня на рынке Узбекистана
						</Trans>
					</div>
				</div>
				<div className="about-us__wrapper">
					<div className="about-card">
						<div className="about-card__title">{t("Люкс, впечатление которое мы производим")}</div>
						<div className="about-card__bottom">
							<div className="about-card__icon"><img src={require("../../../assets/icon/aboutIcon1.svg")} alt="" />
							</div>
							<div className="about-card__num">01</div>
						</div>
					</div>
					<div className="about-card">
						<div className="about-card__title">{t("Профессионализм, отмеченный наградами")}</div>
						<div className="about-card__bottom">
							<div className="about-card__icon"><img src={require("../../../assets/icon/aboutIcon2.svg")} alt="" />
							</div>
							<div className="about-card__num">02</div>
						</div>
					</div>
					<div className="about-card">
						<div className="about-card__title">{t("Выгода, сохраняющая семейный бюджет")}</div>
						<div className="about-card__bottom">
							<div className="about-card__icon"><img src={require("../../../assets/icon/aboutIcon3.svg")} alt="" />
							</div>
							<div className="about-card__num">03</div>
						</div>
					</div>
					<div className="about-card">
						<div className="about-card__title">{t("Качество, проверенное годами")}</div>
						<div className="about-card__bottom">
							<div className="about-card__icon"><img src={require("../../../assets/icon/aboutIcon4.svg")} alt="" />
							</div>
							<div className="about-card__num">04</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutUs;
