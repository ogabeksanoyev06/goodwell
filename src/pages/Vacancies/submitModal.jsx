import React from "react";
import { useTranslation } from "react-i18next";
import { Fields, Modal } from "../../components";
import EntityForm from "../../modules/entity/forms";
import { useNotification } from "../../hooks";
import { Field } from "formik";
import get from "lodash/get";
import cn from "classnames"
import { useSelector } from "react-redux";

const SubmitModal = ({submitModal, showSubmitModal,selected}) => {
	const {t} = useTranslation("main");
	const currentLangCode = useSelector(state => state.system.currentLangCode);
	const { notification } = useNotification();
	return (
		<Modal
			size={560}
			isOpen={submitModal}
			toggle={() => showSubmitModal(false)}
			closeIcon={false}
		>
			<EntityForm.Default
				url="/feedback"
				method="post"
				onSuccess={(data, resetForm) => {
					notification(t("Успешно отправлено"), {
						type: "success"
					});
					resetForm();
					showSubmitModal(false)
				}}
				onError={error => {
					notification(get(error, "errorMessage"), {
						type: "danger"
					});
				}}
				fields={[
					{
						name: "name",
						required: true
					},
					{
						name: "phone",
						required: true
					},
					{
						name: "email",
					},
					{
						name: "vacancy_id",
						required: true,
						value: selected,
						onSubmitValue: value => value.id
					},
					{
						name: 'type',
						value: 2
					}
				]}
			>
				{({ isSubmitting }) => {
					return (
						<div className="modal-request">
							<p className="modal-request__title">{t("Форма заявки")}</p>
							<div className="modal-request__form">
								<Field
									component={Fields.MainAsyncSelect}
									loadOptionsUrl="/vacancies"
									name="vacancy_id"
									label={t("Выберите вакансию")}
									optionLabel={`name_${currentLangCode}`}
									placeholder={t("Выберите вакансию")}
								/>

								<Field
									component={Fields.MainInput}
									type="text"
									name="name"
									placeholder={t("Имя")}
								/>
								<Field
									component={Fields.MainInputMask}
									mask="+\9\9\8(99) 999-99-99"
									type="text"
									name="phone"
									placeholder={t("Номер телефона")}
								/>
								<Field
									component={Fields.MainInput}
									type="email"
									name="email"
									placeholder={t("Email")}
								/>
								<button
									type="submit"
									disabled={isSubmitting}
									className={cn("btn btn-red btn-loading", {"--loading": isSubmitting })}
								>
									<span>{t("Отправить")}</span>
								</button>
							</div>
						</div>
					);
				}}
			</EntityForm.Default>
		</Modal>
	);
};

export default SubmitModal;
