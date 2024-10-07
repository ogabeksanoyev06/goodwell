import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";

import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";

import { i18n, api } from "./services";
import { configure as configureStore } from "./store";
import App from "./App";

import "./assets/styles/main.css";
import "./assets/styles/styles.css";
import "./assets/styles/responsive.css";

import "./assets/styles/normalize.css";
import "swiper/swiper.css";
import "./assets/styles/bootstrap-grid.min.css";
import "react-image-lightbox/style.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

const store = configureStore();
store.subscribe(() => {
  api.subscribe(store);
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      retry: false,
    },
  },
});
const render = (Component) => {
  ReactDOM.render(
    <Provider {...{ store }}>
      <Suspense fallback="">
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <I18nextProvider i18n={i18n()}>
              <Component {...{ store }} />
            </I18nextProvider>
          </QueryClientProvider>
        </BrowserRouter>
      </Suspense>
    </Provider>,
    document.getElementById("root")
  );
};

render(App);

if (module.hot) {
  module.hot.accept("./routes", () => {
    const NextApp = require("./routes").default;
    render(NextApp);
  });
}
