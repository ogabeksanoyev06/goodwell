import React, { useState } from "react";
import EntityContainer from "../../modules/entity/containers";
import get from "lodash/get";
import HTMLParser from "react-html-parser";
import Lightbox from "react-image-lightbox";
import { Spinner } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { helpers, storage } from "../../services";
import Actions from "../../store/actions/auth";
import { useNotification } from "../../hooks";
import SliderSection from "./sliderSection";
import { useTranslation } from "react-i18next";
import SimilarProducts from "./similarProducts";
import SEO from "../../components/Seo/index"; // SEO komponentini import qilamiz

const Index = ({ match }) => {
  const { t } = useTranslation("main");
  const dispatch = useDispatch();
  const { notification } = useNotification();
  const cartItems = useSelector((state) => state.auth.cartProducts);
  const { id } = match.params;
  const [isThumbOpen, setIsThumbOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const addToCart = (item) => {
    if (!cartItems.find((c) => c.id === item.id)) {
      const arr = [...cartItems, { id: item.id, cart_quantity: 1 }];
      storage.set("cart_products", JSON.stringify(arr));
      dispatch(Actions.SetProductToCart(arr));
      notification(t("Успешно добавлено на корзинку"), {
        type: "success",
      });
    } else {
      notification("Успешно добавлено на корзинку", {
        type: "success",
      });
    }
  };

  return (
    <div className="site-wrapper">
      <EntityContainer.One
        entity="products"
        name={`all`}
        url={`/products/${id}`}
        primaryKey="slug"
        id={id}
        params={{
          include: "file,translate,category",
          extra: {
            append: "gallery0",
          },
        }}
      >
        {({ item, isFetched }) => {
          const title = get(item, "translate.title", t("Mahsulot"));
          const description = get(item, "translate.description", t("Tavsif"));
          let images = get(item, "gallery0", []).reduce(
            (prev, curr) => [...prev, get(curr, "thumbnails.normal.src")],
            []
          );
          const mainImage = get(item, "file.thumbnails.normal.src");
          if (images.length < 1) {
            images = [mainImage];
          }
          const oldPrice = item.old_price ? Number(item.old_price) : 0;

          return item.id ? (
            <div className="container">
              {/* SEO uchun title va descriptionni qo'shamiz */}
              <SEO title={title} description={description} />

              {isThumbOpen && (
                <Lightbox
                  mainSrc={images[photoIndex]}
                  nextSrc={images[(photoIndex + 1) % images.length]}
                  prevSrc={
                    images[(photoIndex + images.length - 1) % images.length]
                  }
                  onCloseRequest={() => setIsThumbOpen(false)}
                  onMovePrevRequest={() =>
                    setPhotoIndex(
                      (prev) => (prev + images.length - 1) % images.length
                    )
                  }
                  onMoveNextRequest={() =>
                    setPhotoIndex((prev) => (prev + 1) % images.length)
                  }
                />
              )}
              <div className="product-single">
                <div className="product-single__slider">
                  <SliderSection
                    {...{ images, setIsThumbOpen, setPhotoIndex }}
                  />
                </div>

                <div className="product-single__info">
                  <div className="product-single__title">
                    {get(item, "translate.title")}
                  </div>
                  <div className="product-single__subtitle">
                    {get(item, "translate.description")}
                  </div>
                  {get(item, "translate.details") && (
                    <div className="product-single__box">
                      <div className="product-single__text">
                        {t("Описание")}:
                      </div>
                      <div className="product-single__list">
                        {HTMLParser(get(item, "translate.details"))}
                      </div>
                    </div>
                  )}

                  {oldPrice > 0 && (
                    <div className="product-single__old-price">
                      {helpers.convertToReadable(oldPrice) + " " + t("сум")}
                    </div>
                  )}
                  <div className="product-single__price">
                    {item.quantity > 0
                      ? helpers.convertToReadable(item.price) + " " + t("сум")
                      : t("нет в наличии")}
                  </div>

                  <div className="product-single__bottom">
                    <button
                      className="btn btn-red"
                      onClick={() => addToCart(item)}
                    >
                      <span>{t("Добавить в корзину")}</span>
                      <img src="@/assets/icon/basket2.svg" alt="" />
                    </button>
                    {get(item, "three_d_link") && (
                      <a
                        href={item.three_d_link}
                        target={"_blank"}
                        className="btn btn-dark"
                      >
                        <img src="@/assets/icon/rotate-3d.svg" alt="" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <EntityContainer.All
                entity="products"
                name={`similar`}
                url="/products"
                primaryKey="id"
                params={{
                  limit: 10,
                  include: "file,translate,category",
                  filter: {
                    category_id: get(item, "category_id"),
                  },
                }}
              >
                {({ items, meta, isFetched }) =>
                  items.length > 0 ? (
                    <div className="sec-padding news-section">
                      <div className="m-box">
                        <h1 className="m-title">{t("Похожие товары")}</h1>
                      </div>

                      <SimilarProducts {...{ items }} />
                    </div>
                  ) : null
                }
              </EntityContainer.All>
            </div>
          ) : (
            <div className="container">
              <Spinner position={"center"} md />
            </div>
          );
        }}
      </EntityContainer.One>
    </div>
  );
};

export default Index;
