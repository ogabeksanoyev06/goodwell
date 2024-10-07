import config from "../../config";
import systemActions from "../actions/system";

const initialState = {
    currentLangCode: config.DEFAULT_LANGUAGE,
    settings: [],
    banners: [],
    categories: [],
    allCategories: [],
    homeProducts: [],
    homeNews: [],
    homeVideos: [],
    faqs: [],
    contacts: [],
    isMobile: false,
    seo: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case systemActions.SetIsMobile.TRIGGER: {
            return {...state, isMobile: action.payload};
        }

        case systemActions.GetSettings.SUCCESS: {
            return {...state, settings: action.payload.data};
        }

        case systemActions.GetSeo.SUCCESS: {
            return {...state, seo: action.payload.data};
        }

        case systemActions.GetBanners.SUCCESS: {
            return {...state, banners: action.payload.data};
        }

        case systemActions.GetCategories.SUCCESS: {
            const arr = action.payload.data;
            let allCategories = [];
            arr.forEach(item => {
                if(item.children.length > 0){
                    allCategories = [...allCategories, ...item.children, item]
                }else{
                    allCategories = [...allCategories, item]
                }
            })
            return {...state, categories: arr, allCategories: allCategories};
        }

        case systemActions.GetHomeProducts.SUCCESS: {
            return {...state, homeProducts: action.payload.data};
        }

        case systemActions.GetHomeNews.SUCCESS: {
            return {...state, homeNews: action.payload.data};
        }

        case systemActions.GetHomeVideo.SUCCESS: {
            return {...state, homeVideos: action.payload.data};
        }

        case systemActions.GetFaqs.SUCCESS: {
            return {...state, faqs: action.payload.data};
        }

        case systemActions.GetContacts.SUCCESS: {
            return {...state, contacts: action.payload.data};
        }

        case systemActions.ChangeLanguage.TRIGGER: {
            return {...state, currentLangCode: action.payload};
        }

        default:
            return state;
    }
};
