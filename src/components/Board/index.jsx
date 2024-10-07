import React from "react";
import {useTranslation} from "react-i18next";

const index = ({ title, children, className, rightContent }) => {
  const {t} = useTranslation()
  return (
    <div className={`board ${className}`}>
      {title ? (
        <div className="form-wrapper__header d-flex justify-content-between">
          <h3 className="form-title">{t(title)}</h3>
          {rightContent}
        </div>
      ) : null}
      <div className="board__wrapper">{children}</div>
    </div>
  );
};

export default index;
