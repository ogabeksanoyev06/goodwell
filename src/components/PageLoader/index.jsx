import React, { useEffect } from "react";
import "./style.css";

const Index = () => {
  useEffect(() => {
    setTimeout(() => {
      if (document.querySelector(".page-preloader")) {
        document.querySelector(".page-preloader").style.opacity = 0;
        setTimeout(() => {
          const pageLoader = document.querySelector(".page-preloader");
          if (pageLoader) pageLoader.remove();
        }, 300);
      }
    }, 500);
  }, []);
  return (
    <div className="page-preloader">
      <div className="page-preloader__wrapper">
        <div className="page-preloader__spinner"></div>
        <div className="page-preloader__icon"></div>
      </div>
    </div>
  );
};

export default Index;
