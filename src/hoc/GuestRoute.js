import React from "react";
import { Redirect, Route } from "react-router-dom";
import {useSelector} from "react-redux";

function GuestRoute({ component: Component, ...restOfProps }) {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <Route
            {...restOfProps}
            render={(props) =>
                !isAuthenticated ? <Component {...props} /> : <Redirect to="/profile" />
            }
        />
    );
}

export default GuestRoute;