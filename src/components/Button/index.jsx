import React from "react";
import { Link } from "react-router-dom";
import cx from "classnames";
import PropTypes from "prop-types";
import IconTrash from "../../assets/icons/icon-trash.svg";
import IconFolder from "../../assets/icons/icon-folder.svg";

const Button = ({
  asLink = false,
  link = "",
  children,
  className = "",
  loadingBlack = false,
  isLoading = false,
  onCLickHandler = () => {},
  htmlType = "button",
  type = "",
  icon,
}) => {
  const classes = cx(
    "btn",
    isLoading && (loadingBlack ? "btn-loading-black" : "btn-loading"),
    type === "block" && "btn_block",
    type === "outline" && "btn_outline",
    className
  );

  const getIcon = () => {
    switch (icon) {
      case "trash":
        return IconTrash;
      case "folder":
        return IconFolder;
      default:
        return "";
    }
  };
  return asLink ? (
    <Link to={link} className={classes}>
      {icon && <img src={getIcon()} alt="" />}
      {children}
    </Link>
  ) : (
    <button
      disabled={isLoading}
      type={htmlType}
      onClick={onCLickHandler}
      className={classes}
    >
      {icon && <img src={getIcon()} alt="" />}
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
};
Button.defaultProps = {
  className: "",
  type: "block",
};

export default Button;
