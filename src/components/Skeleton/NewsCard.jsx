import React from 'react';

const NewsCard = () => {
    return (
        <div className="news-card skeleton">
            <div className="news-card__top">
                <div className="news-card__img skeleton-background" style={{borderRadius: '10px'}}></div>
                <div className="news-card__date skeleton-background color-transparent">
                    -
                </div>
            </div>
            <div className="news-card__title skeleton-background color-transparent">-</div>
            <div className="news-card__title skeleton-background color-transparent mt-5 w-70">-</div>
        </div>
    );
};

export default NewsCard;