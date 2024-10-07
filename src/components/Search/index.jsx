import React, {useState} from 'react';
import {useHistory, useParams} from "react-router";
import {useTranslation} from "react-i18next";

const Index = () => {
    const {t} = useTranslation()
    const history = useHistory();
    const {key} = useParams()
    const [searchValue, setSearchText] = useState(key ? key : '');

    const onSearch = (value) => {
        setSearchText(value)
    };

    const onEnter = (event) => {
        if (event.keyCode === 13) {
            onSubmit();
        }
    };
    const onSubmit = () => {
        if (searchValue) {
            history.push(`/products/search/${searchValue}`);
            setSearchText('');
        } else {
            history.push(`/`);
            setSearchText('');
        }
    };

    return (
        <section className="search">
            <div className="container">
                <form action="#" className="search-form">
                    <div className="search-box">
                        <input
                            onChange={e => {
                                onSearch(e.target.value);
                            }}
                            value={searchValue}
                            className="search-input"
                            onKeyDown={(e) => onEnter(e)}
                            type="text"
                            placeholder={t("Искать товары")}
                        />
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Index;