import React, {Component, useEffect, useState} from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import {components} from "react-select"
import AsyncPaginate from "react-select-async-paginate";
import {ReactComponent as SelectDelete} from "../../assets/icons/select-delete.svg";

import get from "lodash/get";
import isEqual from "lodash/isEqual";
import { api, queryBuilder } from "../../services";
import cn from "classnames";
import {useTranslation} from "react-i18next";

const ValueContainer = ({ children, ...props }) => {
    const {t} = useTranslation()
    const selectedOptions = props.getValue();
    const canShowItems = selectedOptions.length < 2
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setIsOpen(prev => prev && !props.selectProps.menuIsOpen)
    }, [props.selectProps.menuIsOpen])

    return (
        <div style={{flex: "1 1 0"}}
            onMouseDown={event => {
                if(!canShowItems){
                    event.stopPropagation()
                }
            }}
             onKeyDown={event => {
                 if(!canShowItems){
                     event.stopPropagation()
                 }
             }}
             onTouchEnd={event => {
                 if(!canShowItems){
                     event.stopPropagation()
                 }
             }}
        >
            <components.ValueContainer
                {...props}
                className="multi-select__value-container"
            >
                {canShowItems ? children : <span>Районы</span>}
                {!canShowItems &&
                    <button
                        className={cn("multi-select__count", {
                            "multi-select__count_active": isOpen
                        })}
                        onClick={(event) => {
                            setIsOpen(prev => !prev)
                            props.selectProps.onMenuClose()
                        }}
                    >
                        {selectedOptions.length}
                    </button>}
            </components.ValueContainer>
            <div className={cn("multi-select__options-container", {
                "multi-select__options-container_active": isOpen
            })}
            >
                <button
                    className="text-btn text-btn--danger"
                    onClick={(event) => {
                        props.clearValue()
                        setIsOpen(false)
                    }}
                >
                    {t("Сбросить все")}
                </button>
                {
                    selectedOptions.map((item) => <div className="multi-select__option" key={item.id}>
                        {props.selectProps.getOptionLabel(item)}
                        <button onClick={() => {
                            const newValue = selectedOptions.filter(inner => inner.id !== item.id)
                            props.setValue(newValue)
                            setIsOpen(prev => newValue.length < 2 ? false : prev)
                        }}><SelectDelete /></button>
                    </div>)
                }
            </div>
        </div>
    )
};

class MainMultiSelect extends Component {
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
            loadOptionsKey,
            placeholder,
            options,
            field,
            optionLabel,
            optionValue,
            form: { errors, setFieldValue, setFieldTouched, touched },
            isDisabled,
            menuPlacement,
            loadOptionsUrl,
            extraOptions,
            filterParams,
            onChange,
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
                                    hideSelectOptions={true}
                                    id={field.name}
                                    name={field.name}
                                    isMulti={true}
                                    debounceTimeout={300}
                                    onChange={option => {
                                        onChange(option)
                                        setFieldValue(field.name, option);
                                    }}
                                    onBlur={() => {
                                        setFieldTouched(field.name, true)
                                    }}
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
                                    isClearable={false}
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
                                    components={{
                                        ValueContainer
                                    }}
                                    isSearchable={false}
                                    {...{ options, placeholder, menuPlacement }}
                            />
                    )}
                    {touched[field.name] && errors[field.name] && (
                            <div className="mod-main-input__error">{errors[field.name]}</div>
                    )}
                </div>
        );
    }
}

export default MainMultiSelect;
