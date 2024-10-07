import React, { useEffect } from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import Select from "react-select";
import cx from "classnames";
import {useTranslation} from "react-i18next";

const SimpleValue = ({ options, value, optionValue, children, ...rest }) => {
  value = value ? options.find(option => option[optionValue] === value) : value;
  return children({ options, value, ...rest });
};

const MainSelect = props => {
  const {
    isClearable,
    isDisabled,
    disableOptions,
    className,
    label,
    isMulti,
    options,
    field,
    optionLabel,
    optionValue,
    form: { touched, errors, setFieldValue, setFieldTouched },
    isSearchable,
    menuPlacement,
    initialValue,
    style,
    onChangeHandle = () => {},
  } = props;

  const {t} = useTranslation()

  const classes = cx(
    "mod-main-input",
    touched[field.name] && errors[field.name] && "mod-main-input--error",
    field.value && "mod-main-input--active",
    className
  );

  useEffect(() => {
    if (initialValue) {
      setFieldValue(field.name, initialValue);
    }
  }, []);
  const customStyles = {
    container: props => ({
      ...props,
      zIndex: 99,
    }),
  };
  return (
    <div className={classes} style={style}>
      {label && <div className="mod-main-input__label">{t(label)}</div>}
      <SimpleValue
        id={field.name}
        name={field.name}
        onChange={option => {
          setFieldValue(field.name, get(option, optionValue, undefined));
          onChangeHandle(option);
        }}
        onBlur={() => setFieldTouched(field.name, true)}
        options={options}
        optionValue={optionValue}
        styles={customStyles}
        getValue={option => option[optionValue]}
        getOptionLabel={option =>
          typeof optionLabel === "function"
            ? optionLabel(option)
            : option[optionLabel]
        }
        getOptionValue={option =>
          typeof optionValue === "function"
            ? optionValue(option)
            : option[optionValue]
        }
        placeholder={t(label)}
        value={field.value}
        isDisabled={isDisabled}
        isMulti={isMulti}
        isSearchable={isSearchable}
        isClearable={isClearable}
        menuPlacement={menuPlacement}
        isOptionDisabled={option =>
          disableOptions
            .reduce((prev, curr) => [...prev, curr.id], [])
            .includes(option.id)
        }
      >
        {simpleProps => (
          <Select classNamePrefix={"mod-select"} {...simpleProps} />
        )}
      </SimpleValue>
      {touched[field.name] && errors[field.name] && (
        <div className="mod-main-input__error">{errors[field.name]}</div>
      )}
    </div>
  );
};

MainSelect.propTypes = {
  label: PropTypes.string.isRequired,
  optionLabel: PropTypes.string,
  optionValue: PropTypes.string,
  options: PropTypes.array.isRequired,
  isSearchable: PropTypes.bool,
  isClearable: PropTypes.bool,
  menuPlacement: PropTypes.string,
  className: PropTypes.string,
};

MainSelect.defaultProps = {
  optionLabel: "name",
  optionValue: "id",
  isSearchable: false,
  isClearable: false,
  menuPlacement: "bottom",
  className: "",
  label: "",
  disableOptions: [],
};

export default MainSelect;
