import React from "react";
import outsideClick from "../../../../hooks/OutsideClick";
import { helpers } from "../../../../services";
import { useSelector } from "react-redux";
import config from "../../../../config";

const Language = () => {
	const { ref, isVisible, setIsVisible } = outsideClick();
	const currentLangCode = useSelector(state => state.system.currentLangCode);
	const languages = config.API_LANGUAGES;

	const handleChangeLanguage = (langCode) => {
		window.history.pushState("", "", helpers.generateNewPath(langCode, null, ""));
		window.location.reload();
	};
	const activeLanguage = languages.find(language => language.code === currentLangCode);

	return (
		<div className="language" ref={ref}>
			<ul className={`language-list ${isVisible ? "open" : ""}`}>
				<li>
					<div
						onClick={() => handleChangeLanguage("ru")}
						className={`language-link ${activeLanguage.code === 'ru' ? 'active' : ''}`}>
						RU
					</div>
				</li>
				<li>
					<div
						onClick={() => handleChangeLanguage("uz")}
						className={`language-link ${activeLanguage.code === 'uz' ? 'active' : ''}`}>
						UZ
					</div>
				</li>
				<li>
					<div
						onClick={() => handleChangeLanguage("en")}
						className={`language-link ${activeLanguage.code === 'en' ? 'active' : ''}`}>
						EN
					</div>
				</li>
			</ul>
			<button className="language-toggle language-text" onClick={() => setIsVisible(prev => !prev)}>
				<span>{activeLanguage.shortTitle}</span>
				<img className="language-arrow" src={require("../../../../assets/icon/arrowBottom.svg")} alt="" />
			</button>
		</div>
	);
};

export default Language;
