import React from "react";
import { Link } from "react-router-dom";
import {ReactComponent as CatalogIcon} from "../../../assets/icon/catalog.svg";
import {ReactComponent as SearchIcon} from "../../../assets/icon/search.svg";
import {ReactComponent as MenuBurger} from "../../../assets/icon/menu-burger.svg";
import {ReactComponent as CloseIcon} from "../../../assets/icon/close-red.svg";
import { useTranslation } from "react-i18next";

const Navigation = ({setFilterVisible, menu, showMenu}) => {
	const {t} = useTranslation("main");
	return (
		<div className='mobile-navigation'>
			<div onClick={() => setFilterVisible(prev => !prev)} className={'mobile-navigation__item'}>
				<span>
					<CatalogIcon/>
				</span>
				{t("Категории")}
			</div>
			<div onClick={() => showMenu(prev => !prev)} className={'mobile-navigation__item'}>
				<span>
					{menu ? (
						<CloseIcon/>
					) : (
						<MenuBurger/>
					)}
				</span>
				{t("Меню")}
			</div>
			<Link to={'/'} className={'mobile-navigation__item'}>
				<span>
					<SearchIcon/>
				</span>
				{t("Поиск")}
			</Link>
		</div>
	);
};

export default Navigation;
