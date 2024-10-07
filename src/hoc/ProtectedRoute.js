import React from "react";
import { Redirect, Route } from "react-router-dom";
// import {useSelector} from "react-redux";
import {Spinner} from "../components";

function ProtectedRoute({ component: Component, ...restOfProps }) {
    // const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    // const isFetched = useSelector(state => state.auth.isFetched);

    const isAuthenticated = true;
    const isFetched = true;
    return (
        <Route
            {...restOfProps}
            render={(props) =>
                isFetched ? (isAuthenticated ? <Component {...props} /> : <Redirect to="/auth/login" />) : <Spinner/>
            }
        />
    );
}

export default ProtectedRoute;