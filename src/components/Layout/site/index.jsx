import React from "react";
import Header from "./header";
import Footer from "./footer";

import {useSelector} from "react-redux";

const Index = ({children}) => {
    const settings = useSelector(state => state.system.settings);

    return (
        <div id="page-wrapper">
            <Header {...{settings}}/>
            <div className={'page-content'}>
                {children}
            </div>
            <Footer {...{settings}}/>
        </div>
    );
};

export default Index;
