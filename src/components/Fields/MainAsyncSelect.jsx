import React, { Component } from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import AsyncPaginate from "react-select-async-paginate";

import get from "lodash/get";
import isEqual from "lodash/isEqual";
import { api, queryBuilder } from "../../services";

class AsyncSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
    optionValue: PropTypes.string,
    optionLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    isSearchable: PropTypes.bool,
    menuPlacement: PropTypes.string,
    filterParams: PropTypes.object,
    extraOptions: PropTypes.array,
    onChange: PropTypes.func,
    loadOptionsKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    loadOptionsParams: PropTypes.func,
    optionRenderer: PropTypes.func
  };

  static defaultProps = {
    title: "",
    className: null,
    optionValue: "id",
    optionLabel: "title",
    isSearchable: false,
    menuPlacement: "bottom",
    disableOptions: [],
    loadOptionsKey: "data",
    extraOptions: [],
    filterParams: {},
    loadOptionsParams: () => {},
    optionRenderer: () => {},
    onChange: () => {}
  };

  load = async (
    search,
    prevOptions,
    { page },
    url,
    filterParams,
    loadOptionsParams,
    loadOptionsKey,
    extraOptions
  ) => {
    const { data } = await api.request.get(
      queryBuilder(url, {
        page,
        filter: filterParams,
        ...loadOptionsParams(search)
      })
    );

    return {
      options: loadOptionsKey
        ? typeof loadOptionsKey === "function"
          ? [...extraOptions, ...loadOptionsKey(data)]
          : [...extraOptions, ...get(data, loadOptionsKey, [])]
        : data,
      hasMore: get(data, "currentPage", 1) < get(data, "lastPage", 1),
      additional: { page: get(data, "currentPage", 1) + 1 }
    };
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.loadOptionsUrl &&
      prevProps.loadOptionsUrl !== this.props.loadOptionsUrl
    ) {
      this.setState({ isLoading: true }, () =>
        this.setState({ isLoading: false })
      );
    }
    if (!isEqual(prevProps.filterParams, this.props.filterParams)) {
      this.setState({ isLoading: true }, () =>
        this.setState({ isLoading: false })
      );
    }

    if (prevProps.canUpdate !== this.props.canUpdate) {
      this.setState({ isLoading: true }, () =>
        this.setState({ isLoading: false })
      );
    }
  }

  render() {
    const {
      disableOptions,
      className,
      label,
      isMulti,
      loadOptionsKey,
      placeholder,
      options,
      field,
      optionLabel,
      optionValue,
      form: { errors, setFieldValue, setFieldTouched, touched },
      isSearchable,
      isDisabled,
      menuPlacement,
      loadOptionsUrl,
      extraOptions,
      filterParams,
      onChange,
      isClearable,
      loadOptionsParams
    } = this.props;

    const classes = cx(
      "mod-main-input",
      touched[field.name] && errors[field.name] && "mod-main-input--error",
      field.value && "mod-main-input--active",
      className
    );

    const { isLoading } = this.state;

    return (
      <div className={classes}>
        {label && <div className="mod-main-input__label">{label}</div>}
        {!isLoading && (
          <AsyncPaginate
            id={field.name}
            name={field.name}
            debounceTimeout={300}
            onChange={option => {
              onChange(option);
              setFieldValue(field.name, option);
            }}
            onBlur={() => setFieldTouched(field.name, true)}
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
            value={field.value}
            additional={{ page: 1 }}
            isDisabled={isDisabled}
            isClearable={isClearable}
            loadOptions={(search, prevOptions, { page }) =>
              this.load(
                search,
                prevOptions,
                { page },
                loadOptionsUrl,
                filterParams,
                loadOptionsParams,
                loadOptionsKey,
                extraOptions
              )
            }
            classNamePrefix={"mod-select"}
            isOptionDisabled={option =>
              disableOptions
                .reduce((prev, curr) => [...prev, curr.id], [])
                .includes(option.id)
            }
            {...{ isMulti, options, placeholder, isSearchable, menuPlacement }}
          />
        )}
        {touched[field.name] && errors[field.name] && (
          <div className="mod-main-input__error">{errors[field.name]}</div>
        )}
      </div>
    );
  }
}

export default AsyncSelect;
