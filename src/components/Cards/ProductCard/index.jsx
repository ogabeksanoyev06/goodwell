import React from "react";
import get from "lodash/get";
import { helpers, storage } from "../../../services";
import { Link } from "react-router-dom";
import Actions from "../../../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNotification } from "../../../hooks";

const Index = ({ item, currentLangCode, t }) => {
  const dispatch = useDispatch();
  const { notification } = useNotification();
  const cartItems = useSelector((state) => state.auth.cartProducts);

  const addToCart = () => {
    if (!cartItems.find((c) => c.id === item.id)) {
      const arr = [...cartItems, { id: item.id, cart_quantity: 1 }];
      storage.set("cart_products", JSON.stringify(arr));
      dispatch(Actions.SetProductToCart(arr));
      notification(t("Успешно добавлено на корзинку"), {
        type: "success",
      });
    } else {
      const arr = cartItems.filter((c) => c.id !== item.id);
      storage.set("cart_products", JSON.stringify(arr));
      dispatch(Actions.SetProductToCart(arr));
      notification("Успешно удалено из корзинки", {
        type: "info",
      });
    }
  };

  const hasCart = cartItems.find((c) => c.id === item.id);
  const oldPrice = item.old_price ? Number(item.old_price) : 0;
  return (
    <div className="product-card">
      <Link className={"product-card__link"} to={`/product/${item.slug}`}></Link>
      {item.is_sale ? (
        <div className="product-card__type --sale">{t("Акция")}</div>
      ) : item.is_new ? (
        <div className="product-card__type">{t("Новинка")}</div>
      ) : (
        <></>
      )}
      <div className="product-card__img">
        <img
          src={get(item, "file.thumbnails.low.src")}
          alt={get(item, "translate.title")}
        />
      </div>
      <div className="product-card__box">
        <div className="product-card__name">
          {get(item, `category.name_${currentLangCode}`)}
        </div>
        <div
          className="product-card__info"
          style={{ marginBottom: oldPrice > 0 ? "40px" : "24px" }}
        >
          {get(item, "translate.title")}
        </div>
        {oldPrice > 0 && (
          <div className="product-card__old-price">
            {helpers.convertToReadable(oldPrice) + " " + t("сум")}
          </div>
        )}
        <div className="product-card__price">
          {item.quantity > 0
            ? helpers.convertToReadable(item.price) + " " + t("сум")
            : t("нет в наличии")}
        </div>
      </div>
      {!!hasCart ? (
        <div
          className="product-card__add-to-cart --success"
          onClick={addToCart}
        >
          <img
            src={require("../../../assets/icon/add-to-cart-success.svg")}
            alt=""
          />
        </div>
      ) : (
        <div className="product-card__add-to-cart" onClick={addToCart}>
          <img src={require("../../../assets/icon/add-to-cart.svg")} alt="" />
        </div>
      )}
    </div>
  );
};

export default Index;
