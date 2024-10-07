import React from "react";

import "./NoData.css";
import cn from "classnames";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const NoData = ({
						   className,
						   style,
						   bigImage,
						   title = "К сожалению товар не найден",
						   description = "Попробуйте ввести данные более точнее",
						   link = "/catalog",
						   linkText = "Перейти в каталог"

					   }) => {
	const {t} = useTranslation("main");
	return (
		<div style={{ ...style }} className={cn("block-no-data", className)}>
			{bigImage ? (
				<img src={require("../../assets/images/notFound.svg")} alt="" />
			) : (
				<img src={require("../../assets/images/noData.svg")} alt="" />
			)}
			<div className="--title">{t(title)}</div>
			{description && (
				<div className="--description">{t(description)}</div>
			)}
			{(link && linkText) && (
				<Link className="--link" to={link}>{t(linkText)}</Link>
			)}
		</div>
	);
};
