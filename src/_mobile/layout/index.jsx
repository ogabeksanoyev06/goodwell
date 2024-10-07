import React, { useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import "./style.css";
import Navigation from "./components/navigation";
import Menu from "./components/menu";
import { useSelector } from "react-redux";
import AsideFilter from "../../pages/Catalog/components/asideFilter";
import { useTranslation } from "react-i18next";

const Index = ({children}) => {
    const isMobile = useSelector(state => state.system.isMobile);
    const settings = useSelector(state => state.system.settings);
    const currentLangCode = useSelector(state => state.system.currentLangCode);
    const [menu, showMenu] = useState(false);
    const [filterVisible, setFilterVisible] = useState(false);
    const phoneHeader = settings.find(s => s.slug === 'phone-header');
    const {t} = useTranslation("main");
    const categories = useSelector(state => state.system.categories);

    useEffect(() => {
        if(menu){
            document.body.style.overflow = 'hidden';
        }else{
            document.body.style.overflow = 'auto';
        }
    }, [menu])
    return (
        <div id="page-wrapper">
            <Header/>
            <div className={'page-content'}>
                {children}
            </div>
            <Footer {...{currentLangCode,settings}}/>
            <Navigation {...{setFilterVisible,showMenu,menu}}/>
            <Menu {...{phoneHeader, showMenu, menu}}/>

            {isMobile && (
                <div className={`catalog-section-wrap__aside ${filterVisible ? '--open' : ''}`}>
                    <div className='close-filter-button' onClick={() => setFilterVisible(false)}>
                        <img src={require("../../assets/icon/close-red.svg")} alt="" />
                    </div>
                    {filterVisible && (
                        <AsideFilter {...{setFilterVisible,currentLangCode,t,categories}}/>
                    )}
                </div>
            )}
        </div>
    );
};

export default Index;
