import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import get from "lodash/get";
import { helpers, storage } from "../../services";
import Actions from "../../store/actions";
import ModuleActions from "../../modules/entity/actions";
import { useNotification } from "../../hooks";
import SubmitModal from "./submitModal";
import { NoData, Spinner } from "../../components";
import { useTranslation } from "react-i18next";

const Index = ({ history }) => {
  const [items, setItems] = useState([]);
  const cartItems = useSelector((state) => state.auth.cartProducts);
  const ids = cartItems.reduce((prev, curr) => [...prev, curr.id], []);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    setItems(cartItems);
  }, [cartItems]);

  const { t } = useTranslation("main");
  const [selectedIds, setSelectedIds] = useState(ids);
  const [selectAll, setSelectAll] = useState(true);
  const [submitModal, showSubmitModal] = useState(false);

  const dispatch = useDispatch();
  const { notification } = useNotification();

  useEffect(() => {
    if (ids.length > 0) {
      dispatch(
        ModuleActions.LoadDefault.request({
          url: "/products",
          params: {
            include: "translate,category,file",
            limit: 100,
            extra: { _ids: ids },
          },
          cb: {
            success: ({ data }) => {
              let arr = [];
              data.forEach((d) => {
                const prevVal = cartItems.find((c) => c.id === d.id);
                arr = [
                  ...arr,
                  prevVal ? { ...d, cart_quantity: prevVal.cart_quantity } : d,
                ];
              });
              setItems(arr);
              setIsFetched(true);
            },
            error: () => {
              setIsFetched(true);
            },
          },
        })
      );
    } else {
      setIsFetched(true);
    }
  }, []);

  const removeAll = () => {
    dispatch(Actions.auth.SetProductToCart([]));
    storage.set("cart_products", JSON.stringify([]));
  };

  const incrementQuantity = (item) => {
    const newArr = items.reduce(
      (prev, curr) => [
        ...prev,
        {
          ...curr,
          cart_quantity:
            item.id === curr.id ? curr.cart_quantity + 1 : curr.cart_quantity,
        },
      ],
      []
    );
    dispatch(Actions.auth.SetProductToCart(newArr));
    storage.set("cart_products", JSON.stringify(newArr));
  };
  const decrementQuantity = (item) => {
    const newArr = items.reduce(
      (prev, curr) => [
        ...prev,
        {
          ...curr,
          cart_quantity:
            item.id === curr.id ? curr.cart_quantity - 1 : curr.cart_quantity,
        },
      ],
      []
    );
    dispatch(Actions.auth.SetProductToCart(newArr));
    storage.set("cart_products", JSON.stringify(newArr));
  };

  const removeHandler = (item) => {
    const newArr = items.filter((i) => i.id !== item.id);
    dispatch(Actions.auth.SetProductToCart(newArr));
    storage.set("cart_products", JSON.stringify(newArr));
  };

  const checkboxHandler = (item) => {
    const id = item.id;
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((s) => s !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const removeSelectedHandler = () => {
    if (selectedIds.length > 0) {
      const newArr = items.filter((item) => !selectedIds.includes(item.id));
      dispatch(Actions.auth.SetProductToCart(newArr));
      storage.set("cart_products", JSON.stringify(newArr));
    } else {
      notification(t("Выберите хотя бы одного товар"), {
        type: "warning",
      });
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectAll(false);
      setSelectedIds([]);
    } else {
      setSelectAll(true);
      setSelectedIds(items.reduce((prev, curr) => [...prev, curr.id], []));
    }
  };

  const calcTotalSum = () => {
    let sum = 0;
    items.forEach((item) => {
      if (selectedIds.includes(item.id)) {
        sum += item.price * item.cart_quantity;
      }
    });
    return sum;
  };
  const totalSum = calcTotalSum();
  return (
    <div className="site-wrapper">
      <SubmitModal
        {...{ submitModal, showSubmitModal, removeAll, selectedIds, items }}
      />
      <section className="back-section">
        <div className="container">
          <button
            className="back-section__btn"
            onClick={() => history.goBack()}
          >
            <img src={require("../../assets/icon/arrowBack.svg")} alt="" />
            <span>{t("Назад")}</span>
          </button>
        </div>
      </section>
      <section className="basket-section">
        {isFetched ? (
          <div className="container">
            <div className="row">
              <div className="col-12 col-xl-8">
                <div className="basket-top">
                  <div className="basket-top__checkbox">
                    <label className="catalog-checkbox__label">
                      <input
                        type="checkbox"
                        className="catalog-checkbox__input"
                        checked={selectAll}
                        onChange={() => handleSelectAll()}
                      />
                      <span className="catalog-checkbox__border"></span>
                      <span className="catalog-checkbox__category">
                        {t("выделить все товары")}
                      </span>
                    </label>
                  </div>

                  <div
                    className="basket-top__delete"
                    onClick={removeSelectedHandler}
                  >
                    <img src={require("../../assets/icon/delete.svg")} alt="" />{" "}
                    <span>{t("Очистить корзину")}</span>
                  </div>
                </div>
                {items.map((item) => {
                  const isChecked = selectedIds.includes(item.id);
                  return (
                    <div className="basket-card">
                      <div className="basket-card__checkbox">
                        <label className="catalog-checkbox__label">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            className="catalog-checkbox__input"
                            onChange={() => checkboxHandler(item)}
                          />
                          <span className="catalog-checkbox__border"></span>
                        </label>
                      </div>

                      <div className="basket-card__img">
                        <img
                          src={get(item, "file.thumbnails.small.src")}
                          alt=""
                        />
                      </div>
                      <div className="basket-card__info">
                        <div>
                          <div className="basket-card__category">
                            <span>{t("Категория")}:</span>{" "}
                            {get(item, "category.name_ru")}
                          </div>
                          <div className="basket-card__title">
                            {get(item, "translate.title")}
                          </div>
                          <div className="basket-card__text">
                            {get(item, "translate.description")}
                          </div>
                          <div className="basket-quantity">
                            <button
                              className="basket-quantity__remove"
                              onClick={() => {
                                if (item.cart_quantity > 1) {
                                  decrementQuantity(item);
                                }
                              }}
                            >
                              -
                            </button>
                            <div className="basket-quantity__zero">
                              {item.cart_quantity}
                            </div>
                            <button
                              className="basket-quantity__add"
                              onClick={() => incrementQuantity(item)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="basket-card__price">
                          {helpers.convertToReadable(
                            item.price * item.cart_quantity
                          )}{" "}
                          {t("сум")}
                        </div>
                      </div>
                      <div
                        className="basket-card__close"
                        onClick={() => removeHandler(item)}
                      >
                        <img
                          src={require("../../assets/icon/close-red.svg")}
                          alt=""
                        />
                      </div>
                    </div>
                  );
                })}

                {items.length < 1 && <NoData />}
              </div>
              <div className="col-12 col-xl-4">
                <div className="basket-total">
                  <div className="basket-total__top">
                    <div className="basket-total__title">{t("Товары")}:</div>
                    {items.map((item) => (
                      <div
                        className="basket-total__quantity"
                        style={{ marginBottom: "20px" }}
                      >
                        {get(item, "translate.title")} x{item.cart_quantity}
                      </div>
                    ))}
                  </div>
                  <div className="basket-total__bottom">
                    <div className="basket-total__total">
                      {t("Итог")}:{" "}
                      <span>{helpers.convertToReadable(totalSum)} сум</span>
                    </div>
                    <div className="basket-total__text">
                      {t("Цена указана с учетом НДС")}
                    </div>
                    {items.length > 0 && (
                      <div className="basket-total__button">
                        <button
                          className="btn btn-dark"
                          onClick={() => {
                            history.push("/");
                            removeAll();
                          }}
                        >
                          <span>{t("Отменить")}</span>
                        </button>
                        <button
                          className="btn btn-red"
                          onClick={() => showSubmitModal(true)}
                        >
                          <span>{t("Заказать")}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="container" style={{ minHeight: "500px" }}>
            <Spinner position={"center"} md />
          </div>
        )}
      </section>
    </div>
  );
};

export default Index;
