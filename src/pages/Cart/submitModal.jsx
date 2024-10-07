import React from "react";
import { useTranslation } from "react-i18next";
import { Fields, Modal } from "../../components";
import EntityForm from "../../modules/entity/forms";
import { useNotification } from "../../hooks";
import { Field } from "formik";
import get from "lodash/get";
import cn from "classnames"
import { useSelector } from "react-redux";

const SubmitModal = ({submitModal, showSubmitModal,removeAll,selectedIds,items}) => {
	const {t} = useTranslation("main");
	const { notification } = useNotification();
	const currentLangCode = useSelector(state => state.system.currentLangCode);

	const getItems = () => {
		let arr = [];
		items.forEach(item => {
			if(selectedIds.includes(item.id)){
				arr = [...arr, {
					id: get(item, 'id'),
					name: get(item, 'translate.title'),
					price: get(item, 'price'),
					quantity: get(item, 'cart_quantity')
				}]
			}
		})
		return arr;
	}

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
					removeAll()
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
						name: "region_id",
						required: true,
						onSubmitValue: value => value.id
					},
					{
						name: 'type',
						value: 1
					},
					{
						name: "products",
						value: getItems()
					}
				]}
			>
				{({ isSubmitting }) => {
					return (
						<div className="modal-request">
							<p className="modal-request__title">{t("Заполните форму для заказа")}</p>
							<div className="modal-request__form">
								<Field
									component={Fields.MainAsyncSelect}
									loadOptionsUrl="/regions"
									name="region_id"
									label={t("Регион")}
									optionLabel={`name_${currentLangCode}`}
									placeholder={t("Выберите регион")}
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
								<button
									type="submit"
									disabled={isSubmitting}
									className={cn("btn btn-red btn-loading", {"--loading": isSubmitting })}
								>
									<span>{t("Заказать")}</span>
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
