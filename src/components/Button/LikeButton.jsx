import React from 'react';

import './style.css';

const LikeButton = ({isFavorite, onFavoriteSelect}) => {
    return (
        <button type="button" className={`svg-like ${isFavorite ? 'active' : ''}`} onClick={onFavoriteSelect}>
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.99875 14.7202C7.89395 14.7202 7.78917 14.6805 7.70134 14.6012C5.17374 12.704 3.49141 11.0471 2.65433 9.63041L2.58171 9.50693L2.52856 9.41572C1.9525 8.42252 1.27875 7.10471 1.27875 5.80069C1.27875 3.30407 2.97997 1.28015 5.07854 1.28015C6.24055 1.28015 7.28074 1.90069 7.97774 2.87843L7.99874 2.90816C8.69575 1.91329 9.74521 1.28015 10.919 1.28015C13.0175 1.28015 14.7187 3.30407 14.7187 5.80069C14.7187 7.1316 14.0169 8.47687 13.4334 9.47674L13.4158 9.50693L13.3432 9.63041C12.5061 11.0471 10.8238 12.704 8.29615 14.6012C8.20833 14.6805 8.10354 14.7202 7.99875 14.7202Z"
                fill="white"
                />
            </svg>
        </button>
    );
};

export default LikeButton;