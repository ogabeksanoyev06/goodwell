import React, { useState } from "react";
import EntityContainer from "../../modules/entity/containers";
import { Seo, Spinner } from "../../components";
import get from "lodash/get";
import SubmitModal from "./submitModal";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { constants } from "../../services";

const Index = ({history}) => {
	const {t} = useTranslation("main");
	const currentLangCode = useSelector(state => state.system.currentLangCode);
	const [submitModal, showSubmitModal] = useState(null);
	const [selected, setSelected] = useState(null);

	return (
		<div className='site-wrapper'>
			<Seo alias={'vacancies'}/>
			<SubmitModal {...{submitModal, showSubmitModal, selected}}/>

			<section className="back-section">
				<div className="container">
					<button className="back-section__btn" onClick={() => history.goBack()}>
						<img src={require('../../assets/icon/arrowBack.svg')} alt=""/>
						<span>{t("Назад")}</span>
					</button>
				</div>
			</section>
			<section className="vacancy-section">
				<div className="container">
					<div>
						<div className="vacancy-section__title">{t("Команда Goodwell")}</div>
						<div className="vacancy-section__text">
							{constants.vacanciesPageDescription[currentLangCode]}
						</div>
					</div>
					<EntityContainer.All
						entity="vacancy"
						name={`all`}
						url="/vacancies"
						primaryKey="id"
						params={{
							limit: 20,
							include: 'region'
						}}
					>
						{({ items, meta, isFetched }) => (
							<>
								{items.length > 0 ? (
									<div className='vacancy-wrapper'>
										{items.map(item => {
											return(
												<div className="vacancy-wrapper__items" onClick={() => {
													showSubmitModal(true)
													setSelected(item)
												}}>
													<div className="vacancy-wrapper__box --start">
														<div className="vacancy-wrapper__name">{t("Вакансия")}</div>
														<div className="vacancy-wrapper__text">{item[`name_${currentLangCode}`]}</div>
													</div>
													<div className="vacancy-wrapper__box">
														<div className="vacancy-wrapper__name">{t("Опыт")}</div>
														<div className="vacancy-wrapper__text">
															<span>{item.experience}</span>
															<span className='ml-5'>{t("года")}</span>
														</div>
													</div>
													<div className="vacancy-wrapper__box">
														<div className="vacancy-wrapper__name">{t("Город")}</div>
														<div className="vacancy-wrapper__text">
															{get(item, `region.name_${currentLangCode}`)}
														</div>
													</div>
												</div>
											)
										})}
									</div>
								) : (
									<>
										{isFetched ? (
											<div>No Data</div>
										) : (
											<div className='mt-30'>
												<Spinner position={'center'} md/>
											</div>
										)}
									</>
								)}
							</>
						)}
					</EntityContainer.All>
				</div>
			</section>

		</div>
	);
};

export default Index;
