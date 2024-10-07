import React, { useEffect } from "react";
import i18next from "i18next";
import config from "./config";
import { useDispatch, useSelector } from "react-redux";
import SystemActions from "./store/actions/system";
import AuthActions from "./store/actions/auth";
import Routes from "./routes";
import { Router } from "react-router-dom";
import { helpers, storage } from "./services";
import {history} from "./store";

const App = () => {
  const dispatch = useDispatch();
  const isMobile = useSelector(state => state.system.isMobile);

  const setGlobalLanguage = () => {
    const pathname = window.location.pathname;
    const locationLang = pathname.split('/')[1];
    const storageLanguage = storage.get('gl_language')

    if(helpers.isEnableLang(locationLang)){
      i18next.changeLanguage(locationLang).then(() => {});
      dispatch(SystemActions.ChangeLanguage(locationLang));
      document.cookie = `language=${locationLang}`
    }else{
      console.log(storageLanguage)
      const lang = storageLanguage ? storageLanguage : config.DEFAULT_LANGUAGE;
      i18next.changeLanguage(lang).then(() => {});
      dispatch(SystemActions.ChangeLanguage(lang));
      document.cookie = `language=${lang}`
    }
  };

  useEffect(() => {
    setGlobalLanguage();
    dispatch(SystemActions.GetSeo());
    dispatch(SystemActions.GetSettings());
    dispatch(SystemActions.GetCategories());
  }, []);

  function setResponsiveSize() {
    if(window.innerWidth > 992){
      dispatch(SystemActions.SetIsMobile(false))
    }else{
      dispatch(SystemActions.SetIsMobile(true))
    }
  }

  function setCartProductsFromStorage() {
    const items = storage.get('cart_products') ? JSON.parse(storage.get('cart_products')) : [];
    dispatch(AuthActions.SetProductToCart(items))
  }
  useEffect(() => {
    setResponsiveSize()
    setCartProductsFromStorage()
  }, []);

  React.useEffect(() => {
    window.addEventListener('resize', setResponsiveSize);

    return _ => {
      window.removeEventListener('resize', setResponsiveSize)

    }
  });

  return (
    <>
      <Router {...{ history }}>
        <div id="custom-alert-zone" />
        <Routes isMobile={isMobile} />
      </Router>
    </>
  );
};

export default App;
