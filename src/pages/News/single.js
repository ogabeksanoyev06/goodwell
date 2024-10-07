import React from "react";
import get from "lodash/get";
import { Spinner } from "../../components";
import EntityContainer from "../../modules/entity/containers";
import HTMLParser from "react-html-parser";
import NewsSection from "../Home/sections/newsSection";
import { useTranslation } from "react-i18next";
import { helpers } from "../../services";

const Single = ({ match, history }) => {
  const { slug } = match.params;
  const { t } = useTranslation("main");

  return (
    <div className="site-wrapper">
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
      <section className="news-single">
        <div className="container">
          <EntityContainer.One
            entity="post"
            name={`all`}
            url={`/posts/${slug}`}
            primaryKey="slug"
            id={slug}
            params={{
              limit: 20,
              include: "file",
            }}
          >
            {({ item, isFetched }) => (
              <>
                {item.id ? (
                  <div className="news-single__wrap">
                    <div className="news-single__wrap-left">
                      <div className="news-single__img">
                        <img
                          src={get(item, "file.thumbnails.low.src")}
                          alt={item.title}
                        />
                      </div>
                    </div>
                    <div className="news-single__wrap-right">
                      <div className="news-single__date">
                        {helpers.formatDate(item.published_at)}
                      </div>
                      <div className="news-single__title">{item.title}</div>
                      <div className="news-single__subtitle">
                        {HTMLParser(get(item, "content"))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-30">
                    <Spinner position={"center"} md />
                  </div>
                )}
              </>
            )}
          </EntityContainer.One>
        </div>
      </section>

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
          <NewsSection items={items} title={t("Интересные новости")} />
        )}
      </EntityContainer.All>
    </div>
  );
};

export default Single;
