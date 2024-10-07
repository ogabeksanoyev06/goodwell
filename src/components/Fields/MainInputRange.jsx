import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { useTranslation } from "react-i18next";
// import "react-input-range/lib/css/index.css";
import { helpers } from "../../services";
import RangeSlider from "react-range-slider-input";

const InputMain = ({
  className,
  label,
  placeholder,
  min,
  max,
  field,
  customValue,
  draggableTrack,
  onChange,
  form: { touched, errors, setFieldValue },
  ...props
}) => {
  const classes = cx("mod-main-input", "mod-main-input-range", className);

  const { t } = useTranslation();

  return (
    <div className={classes}>
      {label && <div className="mod-main-input__label">{t(label)}</div>}

      <div className="input-range__wrap">
        <RangeSlider min={min} max={max} value={[field.value.min, field.value.max]} onInput={e => {
          setFieldValue(field.name, {min: e[0], max: e[1]});
          onChange({min: e[0], max: e[1]});
        }} />
      </div>

      <input
        disabled={true}
        className="mod-main-input__input pl-10 pr-10"
        value={
          customValue ? customValue : helpers.convertToReadable(field.value)
        }
        {...{ placeholder }}
        {...props}
      />

      {touched[field.name] && errors[field.name] && (
        <span className="mod-main-input__error">{t(errors[field.name])}</span>
      )}
    </div>
  );
};

InputMain.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  customValue: PropTypes.string,
  draggableTrack: PropTypes.bool
};

InputMain.defaultProps = {
  label: "",
  placeholder: "",
  className: null,
  min: 0,
  max: 100,
  customValue: "",
  draggableTrack: false
};

export default InputMain;
