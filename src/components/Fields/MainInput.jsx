import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { useTranslation } from "react-i18next";
import { isFunction } from "lodash";

const InputMain = ({
  className,
  label,
  readOnly,
  placeholder,
  type,
  size,
  disabled,
  validateName,
  labelClassName,
  field,
  isProfile,
  form: { touched, errors },
  ...props
}) => {
  const classes = cx(
    "mod-main-input",
    touched[field.name] && errors[field.name] && "mod-main-input--error",
    touched[validateName] && errors[validateName] && "mod-main-input--error",
    size && `mod-main-input--${size}`,
    disabled && `mod-main-input--disabled`,
    !errors[field.name] && field.value && "mod-main-input--active",
    field.value && "mod-main-input--hasVal",
    className,
    {
      "profile-input": isProfile
    }
  );

  const { t } = useTranslation();

  return (
    <div className={classes}>
      {label && <label className={`mod-main-input__label ${labelClassName}`}>{label}</label>}
      <input
        className="mod-main-input__input"
        readOnly={readOnly}
        disabled={disabled}
        placeholder={t(placeholder)}
        {...{ type }}
        {...field}
        {...props}
        onChange={event => {
          field.onChange(event);
          if (isFunction(props.onChange)) props.onChange(event);
        }}
      />

      {touched[field.name] && errors[field.name] && (
        <span className="mod-main-input__error">{t(errors[field.name])}</span>
      )}
    </div>
  );
};

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

export default InputMain;
