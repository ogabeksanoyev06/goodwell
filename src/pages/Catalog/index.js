import React, { useEffect, useState } from "react";
import AsideFilter from "./components/asideFilter";
import get from "lodash/get";
import qs from "qs";
import { LoadMoreVisible, NoData, Seo, Spinner } from "../../components";
import EntityContainer from "../../modules/entity/containers";
import outsideClick from "../../hooks/OutsideClick";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ProductCard } from "../../components/Cards";

const Index = ({ location, history }) => {
  const [page, setPage] = useState(1);
  const categories = useSelector((state) => state.system.categories);
  const allCategories = useSelector((state) => state.system.allCategories);
  const { t } = useTranslation("main");
  const currentLangCode = useSelector((state) => state.system.currentLangCode);
  const [filterVisible, setFilterVisible] = useState(false);
  const isMobile = useSelector((state) => state.system.isMobile);
  const { ref, isVisible, setIsVisible } = outsideClick();
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const filterData = params.filterData
    ? JSON.parse(atob(params.filterData))
    : {};
  const selectedCategories = get(filterData, "categories", []);
  const selectedType = get(filterData, "type", "all");
  const clearFilter = () => {
    history.push({
      search: qs.stringify({ filterData: undefined }, { encode: false }),
    });
  };
  const removeHandler = (id) => {
    setPage(1);
    const arr = selectedCategories.filter((sc) => sc !== id);
    const newVal = {
      ...filterData,
      categories: arr,
    };
    setParams(btoa(JSON.stringify(newVal)));
  };

  const setParams = (obj) => {
    setPage(1);
    history.push({
      search: qs.stringify({ filterData: obj }, { encode: false }),
    });
  };

  const setProductType = (val) => {
    const newVal = {
      ...filterData,
      type: val,
    };
    setParams(btoa(JSON.stringify(newVal)));
  };

  useEffect(() => {
    if (filterVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [filterVisible]);

  return (
    <div className={"site-wrapper"}>
      <Seo alias={"catalog"} />
      <div className="catalog-section">
        <div className="container">
          <div className="m-box">
            {params._q ? (
              <h1 className="m-title">
                {t("Результаты поиска товара")} - {params._q}
              </h1>
            ) : (
              <h1 className="m-title">{t("Категории")}</h1>
            )}
          </div>
          <div className="catalog-section-wrap">
            {isMobile && (
              <div
                className="filter-button"
                onClick={() => setFilterVisible(true)}
              >
                <img src="@/assets/icon/filter.svg" alt="" />
                {t("Filter")}
              </div>
            )}
            <div
              className={`catalog-section-wrap__aside ${
                filterVisible ? "--open" : ""
              }`}
            >
              {isMobile && (
                <div
                  className="close-filter-button"
                  onClick={() => setFilterVisible(false)}
                >
                  <img src="@/assets/icon/close-red.svg" alt="" />
                </div>
              )}
              <AsideFilter
                {...{
                  setFilterVisible,
                  currentLangCode,
                  t,
                  categories,
                  setPage,
                }}
              />
            </div>
            <div className="catalog-section-wrap__content">
              <div className="catalog-wrapper">
                {!params._q && (
                  <div className="catalog-wrapper__top">
                    <div className="catalog-wrapper__box">
                      {selectedCategories.map((catId, i) => {
                        const sc = allCategories.find(
                          (c) => c.id === Number(catId)
                        );
                        return (
                          <div
                            key={i}
                            className="catalog-wrapper__item"
                            onClick={() => removeHandler(catId)}
                          >
                            <div className="catalog-wrapper__name">
                              {get(sc, `name_${currentLangCode}`)}
                            </div>
                            <div className="catalog-wrapper__clear"></div>
                          </div>
                        );
                      })}
                      {selectedCategories.length > 0 && (
                        <div
                          className="catalog-wrapper__filter"
                          onClick={clearFilter}
                        >
                          {t("Очистить фильтр")}
                        </div>
                      )}
                    </div>
                    <div
                      className={`custom-dropdown ${isVisible ? "--open" : ""}`}
                      ref={ref}
                    >
                      <div
                        className="custom-dropdown__value"
                        onClick={() => setIsVisible((prev) => !prev)}
                      >
                        {selectedType === "is_new" && (
                          <span>{t("Новинки")}</span>
                        )}
                        {selectedType === "is_sale" && (
                          <span>{t("Акции")}</span>
                        )}
                        {selectedType !== "is_sale" &&
                          selectedType !== "is_new" && (
                            <span>{t("Все продукты")}</span>
                          )}

                        <div className="custom-dropdown__icon"></div>
                      </div>
                      <div className="custom-dropdown__list">
                        {selectedType !== "is_new" && (
                          <div
                            onClick={() => {
                              setProductType("is_new");
                              setIsVisible(false);
                            }}
                          >
                            {t("Новинки")}
                          </div>
                        )}
                        {selectedType !== "is_sale" && (
                          <div
                            onClick={() => {
                              setProductType("is_sale");
                              setIsVisible(false);
                            }}
                          >
                            {t("Акции")}
                          </div>
                        )}
                        {(selectedType === "is_sale" ||
                          selectedType === "is_new") && (
                          <div
                            onClick={() => {
                              setProductType("all");
                              setIsVisible(false);
                            }}
                          >
                            {t("Все продукты")}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <EntityContainer.All
                  entity="products"
                  name={`all`}
                  url="/products"
                  primaryKey="id"
                  metaKey={(response) => {
                    return {
                      current_page: response.current_page,
                      last_page: response.last_page,
                    };
                  }}
                  params={{
                    page,
                    limit: 20,
                    include: "file,category,translate",
                    filter: {
                      is_sale: selectedType === "is_sale" ? 1 : undefined,
                      is_new: selectedType === "is_new" ? 1 : undefined,
                    },
                    extra: {
                      title: params._q ? params._q : null,
                      categoryIds: selectedCategories.join(","),
                    },
                  }}
                  appendData={true}
                >
                  {({ items, meta, isFetched }) => {
                    return (
                      <>
                        {items.length > 0 ? (
                          <div className="catalog-wrapper__inner">
                            {items.map((item, a) => {
                              return (
                                <ProductCard
                                  key={a}
                                  {...{ item, currentLangCode, t }}
                                />
                              );
                            })}
                          </div>
                        ) : (
                          <div className="">
                            {isFetched ? (
                              <NoData />
                            ) : (
                              <div className="mt-30">
                                <Spinner position={"center"} md />
                              </div>
                            )}
                          </div>
                        )}

                        {get(meta, "last_page") > get(meta, "current_page") && (
                          <LoadMoreVisible
                            setPage={() => setPage((prev) => prev + 1)}
                          />
                        )}
                      </>
                    );
                  }}
                </EntityContainer.All>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
