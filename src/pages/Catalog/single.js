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

const Single = ({ match, location, history }) => {
  const { slug } = match.params;
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

  // Clear all filters
  const clearFilter = () => {
    setPage(1);
    const newVal = { ...filterData, categories: [], type: "all" };
    setParams(newVal);
  };

  // Remove a specific filter
  const removeHandler = (id) => {
    setPage(1);
    const updatedCategories = selectedCategories.filter((sc) => sc !== id);
    const newVal = { ...filterData, categories: updatedCategories };
    setParams(newVal);
  };

  // Update the URL params and reset the page
  const setParams = (obj) => {
    setPage(1);
    history.push({
      search: qs.stringify(
        { filterData: btoa(JSON.stringify(obj)) },
        { encode: false }
      ),
    });
  };

  // Set the product type filter
  const setProductType = (val) => {
    const newVal = { ...filterData, type: val };
    setParams(newVal);
  };

  // Manage body overflow on mobile when filters are open
  useEffect(() => {
    document.body.style.overflow = filterVisible ? "hidden" : "auto";
  }, [filterVisible]);

  return (
    <div className={"site-wrapper"}>
      <Seo alias={"catalog"} />
      <div className="catalog-section">
        <div className="container">
          <div className="m-box">
            <h1 className="m-title">
              {t("Категории")} - {slug}
            </h1>
          </div>
          <div className="catalog-section-wrapSlug">
            <div className="catalog-section-wrap__contentSlug">
              <div className="catalog-wrapper">
                {/* Display selected categories and filters */}
                {!params._q && (
                  <div className="catalog-wrapper__top">
                    <div className="catalog-wrapper__box">
                      {selectedCategories.map((catId, i) => {
                        const category = allCategories.find(
                          (c) => c.id === Number(catId)
                        );
                        return (
                          <div
                            key={i}
                            className="catalog-wrapper__item"
                            onClick={() => removeHandler(catId)}
                          >
                            <div className="catalog-wrapper__name">
                              {get(category, `name_${currentLangCode}`)}
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

                    {/* Dropdown for product types */}
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
                        {selectedType === "all" && (
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
                        {(selectedType === "is_new" ||
                          selectedType === "is_sale") && (
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

                {/* Entity Container for fetching products */}
                <EntityContainer.All
                  entity="products"
                  name={`all`}
                  url={`/categories/${slug}`}
                  primaryKey="slug"
                  metaKey={(response) => ({
                    current_page: response.current_page,
                    last_page: response.last_page,
                  })}
                  params={{
                    page,
                    limit: 20,
                    filter: {
                      is_sale: selectedType === "is_sale" ? 1 : undefined,
                      is_new: selectedType === "is_new" ? 1 : undefined,
                    },
                  }}
                  dataKey={"products"}
                  appendData={true}
                >
                  {({ items, meta, isFetched }) => (
                    <>
                      {items.length > 0 ? (
                        <div className="catalog-wrapper__innerSlug">
                          {items.map((item, index) => (
                            <ProductCard
                              key={index}
                              {...{ item, currentLangCode, t }}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="">
                          {isFetched ? (
                            <NoData />
                          ) : (
                            <Spinner position={"center"} md />
                          )}
                        </div>
                      )}
                      {get(meta, "last_page") > get(meta, "current_page") && (
                        <LoadMoreVisible
                          setPage={() => setPage((prev) => prev + 1)}
                        />
                      )}
                    </>
                  )}
                </EntityContainer.All>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
