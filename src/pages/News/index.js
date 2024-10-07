import React from "react";
import get from "lodash/get";
import { Seo, Spinner } from "../../components";
import EntityContainer from "../../modules/entity/containers";
import { Link } from "react-router-dom";
import { helpers } from "../../services";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation("main");
  return (
    <div className="site-wrapper">
      <Seo alias={"news"} />
      <div className="container">
        <div className="m-box">
          <h1 className="m-title">{t("Новости")}</h1>
        </div>
        <EntityContainer.All
          entity="post"
          name={`all`}
          url="/posts"
          primaryKey="id"
          params={{
            limit: 20,
            include: "file",
            filter: {
              type: 1,
            },
          }}
        >
          {({ items, meta, isFetched }) => (
            <>
              {items.length > 0 ? (
                <div className="news-list">
                  {items.map((item, i) => {
                    return (
                      <Link
                        to={`/news/${item.slug}`}
                        className="news-card"
                        key={i}
                      >
                        <div className="news-card__img">
                          <img
                            src={get(item, "file.thumbnails.low.src")}
                            alt={get(item, "title")} // alt ni yangilik sarlavhasiga tenglash
                          />
                        </div>
                        <div className="news-card__date">
                          {helpers.formatDate(item.published_at)}
                        </div>
                        <div className="news-card__title">
                          {get(item, "title")}
                        </div>
                        <div className="news-card__subtitle">
                          {get(item, "description")}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <>
                  {isFetched ? (
                    <div>No Data</div>
                  ) : (
                    <div className="mt-30">
                      <Spinner position={"center"} md />
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </EntityContainer.All>
      </div>
    </div>
  );
};

export default Index;
