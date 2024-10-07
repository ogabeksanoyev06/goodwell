import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { useTranslation } from "react-i18next";

const MainTextarea = ({
	className,
	label,
	readOnly,
	placeholder,
	type,
	size,
	field,
	disabled,
	validateName,
	rows,
	form: { touched, errors },
	...props
}) => {
	MainTextarea.propTypes = {
		label: PropTypes.string,
		type: PropTypes.oneOf(["text", "password", "number", "email"]),
		className: PropTypes.string,
		placeholder: PropTypes.string,
		readOnly: PropTypes.bool,
		size: PropTypes.oneOf(["default", "large", "small"]),
		disabled: PropTypes.bool,
		validateName: PropTypes.string,
		rows: PropTypes.number
	};

	MainTextarea.defaultProps = {
		label: "",
		placeholder: "",
		type: "text",
		className: null,
		readOnly: false,
		disabled: false,
		size: "default",
		validateName: "",
		rows: 5
	};

	const classes = cx(
		"mod-main-input",
		touched[field.name] && errors[field.name] && "mod-main-input--error",
		touched[validateName] &&
			errors[validateName] &&
			"mod-main-input--error",
		size && `mod-main-input--${size}`,
		disabled && `mod-main-input--disabled`,
		!errors[field.name] && field.value && "mod-main-input--active",
		field.value && "mod-main-input--hasVal",
		className
	);

	const { t } = useTranslation();

	return (
		<div className={classes}>
			<textarea
				rows={rows}
				className="mod-main-input__textarea"
				readOnly={readOnly}
				disabled={disabled}
				placeholder={t(placeholder)}
				{...{ type }}
				{...field}
				{...props}
			/>

			{label && (
				<label className="mod-main-input__label">
					{typeof label === "function" ? label(t) : t(label)}
				</label>
			)}

			{touched[field.name] && errors[field.name] && (
				<span className="mod-main-input__error">
					{t(errors[field.name])}
				</span>
			)}
		</div>
	);
};

export default MainTextarea;
