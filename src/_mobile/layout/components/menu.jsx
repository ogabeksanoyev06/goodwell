import React from "react";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";

const Menu = ({showMenu, menu, phoneHeader}) => {
	const {t} = useTranslation("main");
	const history = useHistory();
	const clickHandler = (link) => {
		showMenu(false)
		history.push(link)
	}
	return (
		<div className={`mob-menu ${menu ? '--open' : ''}`}>
			{phoneHeader && (
				<a href={`tel:${phoneHeader.value}`} className='mob-menu-phone'>{phoneHeader.name}</a>
			)}
			<div className={'mob-menu__link'} onClick={() => clickHandler('/')}>{t("Главная")}</div>
			<div className={'mob-menu__link'} onClick={() => clickHandler('/about-us')}>{t("О нас")}</div>
			<div className={'mob-menu__link'} onClick={() => clickHandler('/news')}>{t("Новости")}</div>
			<div className={'mob-menu__link'} onClick={() => clickHandler('/vacancies')}>{t("Вакансии")}</div>
			<div className={'mob-menu__link'} onClick={() => clickHandler('/contacts')}>{t('Контакты')}</div>
			<div className={'mob-menu__link'} onClick={() => clickHandler('/cart')}><img src={require('../../../assets/icon/basket.svg')} alt=""/>{t("Корзина")}</div>
		</div>
	);
};

export default Menu;
