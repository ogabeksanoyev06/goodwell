import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SystemActions from "../../../store/actions/system";
import get from "lodash/get";
import qs from "qs";
import { useHistory, useLocation } from "react-router";

const AsideFilter = ({setFilterVisible,t,currentLangCode,categories, setPage}) => {
	const history = useHistory();
	const location = useLocation();
	const params = qs.parse(location.search, {ignoreQueryPrefix: true});

	const [openedIds, setOpenedIds] = useState([]);
	const dispatch = useDispatch();
	useEffect(() => {
		if(categories.length < 1) dispatch(SystemActions.GetCategories());
	}, []);

	const handleClick = (id) => {
		if(openedIds.includes(id)){
			const arr = openedIds.filter(o => o !== id)
			setOpenedIds(arr)
		}else{
			const arr = [...openedIds, id]
			setOpenedIds(arr)
		}
	}

	const setParams = (obj) => {
		setPage(1)
		history.push({
			pathname: 'catalog',
			search: qs.stringify({ filterData: obj }, {encode: false})
		})
	}

	const handleClickCategory = (item) => {
		// const itemSimple = {id: item.id, name: item.name_ru};
		const filterData = params.filterData ? JSON.parse(atob(params.filterData)) : {};
		const categories = get(filterData, 'categories', []);

		if(!categories.find(c => c.id === item.id)){
			const newVal = {
				...filterData,
				categories: [...categories, item.id]
			}
			setParams(btoa(JSON.stringify(newVal)))
			setFilterVisible(false)
		}
	}

	return (
		<div className="catalog-filter">
			<div className="catalog-filter__box">
				<div className="catalog-filter__title">{t("Категории")}</div>
				{categories.map(parent => {
					const icon = get(parent, 'icon.thumbnails.small.src');
					const isOpen = openedIds.includes(parent.id);
					return(
						<ul className={`catalog-filter__item ${isOpen ? '--open' : ''}`}>
							<li>
								<div className="catalog-filter__items" onClick={() => handleClick(parent.id)}>
									<img src={icon ? icon : require("../../../assets/icon/category-icon.svg")} alt="" className='category-icon'/>
									<div className="catalog-filter__name">{get(parent, `name_${currentLangCode}`)}</div>
									<img src={require("../../../assets/icon/arrow-up.svg")} alt=""/>
								</div>
								<ul className="catalog-filter__list">
									{get(parent, 'children', []).length > 0 ? (
										parent.children.map(item => {
											return(
												<li onClick={() => handleClickCategory(item)}>
													<div className="catalog-filter__link">{get(item, `name_${currentLangCode}`)}</div>
												</li>
											)
										})
									) : (
										<li onClick={() => handleClickCategory(parent)}>
											<div className="catalog-filter__link">{get(parent, `name_${currentLangCode}`)}</div>
										</li>
									)}
								</ul>
							</li>
						</ul>
					)
				})}
			</div>
			{/*<div className="catalog-filter__box">*/}
			{/*	<div className="catalog-filter__title">Бренд</div>*/}
			{/*	<ul className="catalog-checkbox">*/}
			{/*		<li><label className="catalog-checkbox__label"><input type="checkbox"*/}
			{/*															  className="catalog-checkbox__input"/> <span*/}
			{/*			className="catalog-checkbox__border"></span> <span*/}
			{/*			className="catalog-checkbox__category">Shivaki</span></label></li>*/}
			{/*		<li><label className="catalog-checkbox__label"><input type="checkbox"*/}
			{/*															  className="catalog-checkbox__input"/> <span*/}
			{/*			className="catalog-checkbox__border"></span> <span*/}
			{/*			className="catalog-checkbox__category">Artel</span></label></li>*/}
			{/*		<li><label className="catalog-checkbox__label"><input type="checkbox"*/}
			{/*															  className="catalog-checkbox__input"/> <span*/}
			{/*			className="catalog-checkbox__border"></span> <span*/}
			{/*			className="catalog-checkbox__category">Royal</span></label></li>*/}
			{/*		<li><label className="catalog-checkbox__label"><input type="checkbox"*/}
			{/*															  className="catalog-checkbox__input"/> <span*/}
			{/*			className="catalog-checkbox__border"></span> <span*/}
			{/*			className="catalog-checkbox__category">Feromon</span></label></li>*/}
			{/*		<li><label className="catalog-checkbox__label"><input type="checkbox"*/}
			{/*															  className="catalog-checkbox__input"/> <span*/}
			{/*			className="catalog-checkbox__border"></span> <span*/}
			{/*			className="catalog-checkbox__category">Marino</span></label></li>*/}
			{/*	</ul>*/}
			{/*</div>*/}
		</div>
	);
};

export default AsideFilter;
