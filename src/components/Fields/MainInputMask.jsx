import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { useTranslation } from "react-i18next";
import InputMask from "react-input-mask";

const InputMain = ({
	mask,
	className,
	label,
	readOnly,
	placeholder,
	type,
	size,
	field,
	disabled,
	validateName,
	form: { touched, errors },
	...props
}) => {
	InputMain.propTypes = {
		label: PropTypes.string,
		type: PropTypes.oneOf(["text", "password", "number", "email"]),
		className: PropTypes.string,
		placeholder: PropTypes.string,
		readOnly: PropTypes.bool,
		size: PropTypes.oneOf(["default", "large", "small"]),
		disabled: PropTypes.bool,
		validateName: PropTypes.string
	};

	InputMain.defaultProps = {
		label: "",
		placeholder: "",
		type: "text",
		className: null,
		readOnly: false,
		disabled: false,
		size: "default",
		validateName: ""
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
			{label && (
				<label className="mod-main-input__label">
					{typeof label === "function" ? label(t) : t(label)}
				</label>
			)}

			<InputMask
				className="mod-main-input__input"
				mask={mask}
				placeholder={t(placeholder)}
				formatChars={{
					"9": "[0-9]",
					A: "[A-Z]"
				}}
				readOnly={readOnly}
				{...{ type }}
				{...field}
				{...props}
			/>

			{touched[field.name] && errors[field.name] && (
				<span className="mod-main-input__error">
					{t(errors[field.name])}
				</span>
			)}
		</div>
	);
};

export default InputMain;
