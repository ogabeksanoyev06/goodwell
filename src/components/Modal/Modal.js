import React, { Component } from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { Transition } from "react-transition-group";

import "./style.css";

class Modal extends Component {
  static propTypes = {
    size: PropTypes.number,
    closeIcon: PropTypes.bool,
    customCloseIcon: PropTypes.any,
    isOpen: PropTypes.bool,
    toggle: PropTypes.func,
    backdrop: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(["static"]),
    ]),
    scroll: PropTypes.bool,
    className: PropTypes.string,
  };

  static defaultProps = {
    size: 700,
    closeIcon: true,
    isOpen: false,
    backdrop: true,
    scroll: false,
  };

  _toggleAction = () => {
    this.props.toggle();
  };

  render() {
    const {
      size,
      closeIcon,
      isOpen,
      backdrop,
      scroll,
      customCloseIcon,
      className,
    } = this.props;

    const classNames = cx("mx-modal-wrapper", className);

    const classNames2 = cx(
      "mx-modal-box",
      closeIcon,
      scroll && "overflow-scroll"
    );

    const defaultStyle = {
      transition: "all .4s ease .2s",
      opacity: 0,
      visibility: "hidden",
    };

    const transitionStyles = {
      entering: { opacity: 0, visibility: "hidden" },
      entered: {
        opacity: 1,
        visibility: "visible",
        transition: "all .4s ease .0s",
      },
      exited: { opacity: 0, visibility: "hidden" },
    };

    const defaultModalStyle = {
      transition: "all .3s ease",
      opacity: 0,
      visibility: "hidden",
      transform: "translateY(-20px)",
    };

    const transitionModalStyles = {
      entering: { opacity: 0, visibility: "hidden" },
      entered: {
        opacity: 1,
        visibility: "visible",
        transform: "translateY(0)",
        transition: "all .3s ease .2s",
      },
      exited: { opacity: 0, visibility: "hidden" },
    };

    return (
      <Transition
        in={isOpen}
        timeout={{
          enter: 0,
          exit: 400,
        }}
        unmountOnExit
      >
        {(state) => (
          <div
            className="mx-main-modal-container"
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <div className="mx-main-modal">
              <div
                className="mx-main-modal-overlay"
                onClick={() =>
                  backdrop === true ? this._toggleAction() : () => {}
                }
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state],
                }}
              >
                {" "}
              </div>
              <div
                className={classNames}
                style={{
                  maxWidth: `${size}px`,
                  ...defaultModalStyle,
                  ...transitionModalStyles[state],
                }}
              >
                {closeIcon && (
                  <div
                    className="custom-modal-close"
                    onClick={this._toggleAction}
                  >
                    {customCloseIcon || (
                      <img
                        src={require("../../assets/icon/close.svg")}
                        alt="close"
                      />
                    )}
                  </div>
                )}
                <div className={classNames2}>{this.props.children}</div>
              </div>
            </div>
          </div>
        )}
      </Transition>
    );
  }
}

export default Modal;
