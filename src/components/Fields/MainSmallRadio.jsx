import React from "react";
import cx from "classnames";
import {useTranslation} from "react-i18next";

const MainSmallRadio = props => {
  const {
    options,
    className,
    label,
    field,
    onChange = () => {},
    form: { touched, errors, setFieldValue }
  } = props;

  const {t} = useTranslation()

  const classes = cx(
    "mod-main-input",
    touched[field.name] && errors[field.name] && "mod-main-input--error",
    field.value && "mod-main-input--active",
    className
  );

  const handleClick = option => {
    const values = field.value;
    let newValue = [];
    if (values.find(value => value.id === option.id)) {
      newValue = values.filter(val => val.id !== option.id);
      setFieldValue(field.name, newValue);
    } else {
      newValue = [...values, option];
      setFieldValue(field.name, newValue);
    }
    onChange(newValue);
  };

  return (
    <div className={classes}>
      {label && <div className="mod-main-input__label">{t(label)}</div>}
      <div className="mod-small-radio">
        <div className="mod-small-radio__wrap">
          {options.map((o, i) => {
            const isActive = field.value.find(val => val.id === o.id);
            return (
              <div
                key={i}
                className={isActive ? "--active" : ""}
                onClick={() => handleClick(o)}
              >
                <span>{t(o.label)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainSmallRadio;
