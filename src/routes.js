import React from "react";
import { Route, Switch } from "react-router-dom";

import SiteLayout from "./components/Layout/site";
import MobileLayout from "./_mobile/layout";
// import MobileLayout from "_mobile/layout";
import ScrollTop from "./hoc/ScrollTop";

//main pages
import NotFoundPage from "./pages/NotFoundPage";
import Home from "./pages/Home";
import Vacancies from "./pages/Vacancies";
import News from "./pages/News";
import NewsSingle from "./pages/News/single";
import AboutUs from "./pages/AboutUs";
import Contacts from "./pages/Contacts";
import Catalog from "./pages/Catalog";
import CatalogSingle from "./pages/Catalog/single";
import Product from "./pages/Product";
import Cart from "./pages/Cart";

const routes = [
  { path: "/", exact: true, component: Home },
  { path: "/vacancies", exact: true, component: Vacancies },
  { path: "/news", exact: true, component: News },
  { path: "/news/:slug", exact: true, component: NewsSingle },
  { path: "/about-us", exact: true, component: AboutUs },
  { path: "/contacts", exact: true, component: Contacts },
  { path: "/catalog", exact: true, component: Catalog },
  { path: "/catalog/:slug", exact: true, component: CatalogSingle },
  { path: "/product/:id", exact: true, component: Product },
  { path: "/cart", exact: true, component: Cart },
];

const Routes = ({ isMobile }) => {
  const AppLayout = isMobile ? MobileLayout : SiteLayout;

  return (
    <Switch>
      <Route>
        <AppLayout>
          <Switch>
            {routes.map((route, key) => (
              <Route
                key={key}
                path={route.path}
                component={ScrollTop(route.component)}
                exact={route.exact}
              />
            ))}
            <Route
              path={"*"}
              component={ScrollTop(NotFoundPage)}
              exact={false}
            />
          </Switch>
        </AppLayout>
      </Route>
    </Switch>
  );
};
export default Routes;
