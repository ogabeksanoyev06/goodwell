import React from "react";
import get from "lodash/get";
import './style.css';
import {helpers} from "../../../services";
import {Link} from "react-router-dom";

const NewsCard = ({item}) => {
    return (
        <Link to={`/blog/${item.slug}`} className="news-card">
            <div className="news-card__top">
                <div className="news-card__img">
                  <img src={helpers.getFileThumb(get(item, 'file.path'))} alt="news-card" />
                </div>
                <div className="news-card__date">{helpers.formatDate(item.published_at)}</div>
            </div>
            <div className="news-card__title">{item.title}</div>
        </Link>
    );
};

export default NewsCard;